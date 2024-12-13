from fastapi import FastAPI, Header, status, Depends, HTTPException, Response, Cookie
from models import LoginSchema, SignUpSchema
from fastapi.responses import JSONResponse
import pyrebase
import json
import firebase_admin
from firebase_admin import credentials, auth
from fastapi.middleware.cors import CORSMiddleware
from firebase_admin import firestore
#from apscheduler.schedulers.background import BackgroundScheduler
from apscheduler.schedulers.asyncio import AsyncIOScheduler
from apscheduler.triggers.cron import CronTrigger
from dotenv import load_dotenv
import os
# from fastapi.responses import HTMLResponse
# from typing import List
# import schedule
import requests
import httpx
from datetime import datetime, time, timedelta
import google.generativeai as genai
import re
from stockOps import stockOptions
# import asyncio
# from fastapi.encoders import jsonable_encoder

load_dotenv()

tiingo_api_key=os.getenv("tiingo_api_key")
polygon_api_key=os.getenv("polygon_api_key")
FIREBASE_API_KEY=os.getenv('FIREBASE_API_KEY')
GEMINI_API_KEY=os.getenv('GEMINI_API_KEY')
service_account_info = json.loads(os.getenv('FIREBASE_SERVICE_ACCOUNT_JSON'))

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


if not firebase_admin._apps:
    cred = credentials.Certificate(service_account_info)
    firebase_admin.initialize_app(cred)

db = firestore.client()

genai.configure(api_key=GEMINI_API_KEY)

firebaseConfig = {
    "apiKey": FIREBASE_API_KEY,
    "authDomain": "stock-876c9.firebaseapp.com",
    "projectId": "stock-876c9",
    "storageBucket": "stock-876c9.appspot.com",
    "messagingSenderId": "1017034504988",
    "appId": "1:1017034504988:web:cdb4ffa3c10f1ce27b18d9",
    "measurementId": "G-8T4F8BQWBR",
    "databaseURL": ""
}

firebase = pyrebase.initialize_app(firebaseConfig)

async def send_email_verification(id_token: str):
    url = f"https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key={FIREBASE_API_KEY}"
    headers = {
        "Content-Type": "application/json"
    }
    payload = {
        "requestType": "VERIFY_EMAIL",
        "idToken": id_token
    }
    response = requests.post(url, headers=headers, json=payload)

    if response.status_code == 200:
        return response.json()
    else:
        raise HTTPException(status_code=response.status_code, detail=response.json())

@app.post('/SignUp')
async def SignUp(user_data: SignUpSchema):
    email = user_data.email
    password = user_data.password

    try:
        user = auth.create_user(
            email=email,
            password=password
        )

        user_sign_in = firebase.auth().sign_in_with_email_and_password(email, password)
        id_token = user_sign_in['idToken']

        verification_response = await send_email_verification(id_token)

        return {
            "message": f"User account created successfully for {user.uid}. Verification email sent to {user_data.email}.",
            "verification_response": verification_response
        }

    except auth.EmailAlreadyExistsError:
        raise HTTPException(
            status_code=400,
            detail=f"Account already created for {email}"
        )




@app.post('/login')
async def login(user_data: LoginSchema):
    email = user_data.email
    password = user_data.password

    try:
        user = firebase.auth().sign_in_with_email_and_password(
            email=email,
            password=password
        )

        if not user:
            raise HTTPException(
                status_code=400,
                detail="Invalid Credentials"
            )

        user_info = auth.get_user(user['localId'])
        if not user_info.email_verified:
            raise HTTPException(
                status_code=403,
                detail="Email not verified. Please verify your email before logging in."
            )

        token = user['idToken']


        return JSONResponse(
            status_code=200,
            content={
                "message": "Login successful.",
                "isverified": user_info.email_verified,
                "token": token
            }
        )
    except Exception as e:
        raise HTTPException(
            status_code=400,
            detail="Invalid"
        )


def validate_token(jwt: str):
    try:
        user = auth.verify_id_token(jwt)
        return user['uid']
    except Exception:
        raise HTTPException(
            status_code=401,
            detail="Invalid token"
        )






@app.get('/get_portfolio_evaluation')
async def get_portfolio_evaluation(token: str):
    uid = validate_token(token)

    if not uid:
        raise HTTPException(status_code=400, detail="Invalid user")

    user = auth.get_user(uid)
    email = user.email

    prev_dict={}
    now_dict={}
    dates_bought=[]

    new_stock_ref = db.collection("users").document(email).collection("stocks")
    docs = new_stock_ref.stream()

    total_spend = 0
    total_value_now = 0

    for doc in docs:
        current = doc.to_dict()
        total_spend += current['amount_spent']
        dates_bought.append(current['date_of_purchase'])

        if current['Name'] in prev_dict:
            prev_dict[current['Name']]['amount_spent'] += current['amount_spent']
            prev_dict[current['Name']]['stocks_bought'] += current['stocks_bought']
        else:
            prev_dict[current['Name']] = {
                'amount_spent': current['amount_spent'],
                'stocks_bought': current['stocks_bought']
            }

    heatmap_dict = {}

    for name in prev_dict:
        stocks_bought = prev_dict[name]['stocks_bought']

        stock_doc_ref = db.collection("stocks_data").document(name)
        stock_data = stock_doc_ref.get()

        if stock_data.exists:
            stock_info_dict = stock_data.to_dict()
            all_info = stock_info_dict.get('all_info', [])

            if all_info:
                latest_entry = all_info[-1]
                value_now = latest_entry['open'] * stocks_bought

                heatmap_dict[name]=value_now

                total_value_now += value_now

                if name in now_dict:
                    now_dict[name]['value_now'] += value_now
                else:
                    now_dict[name] = {'value_now': value_now}
        else:
            print(f"No data found for {name}.")

    profit_dict = {}
    best_profit = float('-inf')  # Use negative infinity for better comparison
    best_profit_stock = ""

    for name in prev_dict:
        if name in now_dict:
            profit_dict[name] = now_dict[name]['value_now'] - prev_dict[name]['amount_spent']
            if profit_dict[name] > best_profit:
                best_profit = profit_dict[name]
                best_profit_stock = name
        else:
            profit_dict[name] = -prev_dict[name]['amount_spent']  # or some default handling

    return {
        "total_spend": total_spend,
        "total_value_now": round(total_value_now,2),
        "best_performing_stock": best_profit_stock,
        "best_performing_stock_profit":best_profit,
        "heatmap_dict":heatmap_dict,
        "dates_bought":dates_bought
    }

# "Name" se stock lo, "stocks_bought" se kitne kharide total stocks





@app.get('/estimate_portfolio_valuation')
async def estimate_portfolio_valuation(token: str):
    uid = validate_token(token)

    if not uid:
        raise HTTPException(status_code=400, detail="Invalid user")

    try:
        user = auth.get_user(uid)
        email = user.email

        # Fetch user's stock collection
        new_stock_ref = db.collection("users").document(email).collection("stocks")
        docs = new_stock_ref.stream()

        each_stock_dict = {}
        stock_with_past_data = {}

        # Process user's stock data
        for doc in docs:
            current = doc.to_dict()
            name_of_stock = current.get('Name')
            stocks_bought = current.get('stocks_bought', 0)

            if not name_of_stock:
                continue  # Skip if stock name is missing

            # Accumulate total stocks bought
            if name_of_stock in each_stock_dict:
                each_stock_dict[name_of_stock] += stocks_bought
            else:
                each_stock_dict[name_of_stock] = stocks_bought

        # Fetch past stock data
        for stock, total_bought in each_stock_dict.items():
            stock_doc = db.collection("stocks_data").document(stock)
            stock_data = stock_doc.get()

            if stock_data.exists:
                stock_data_dict = stock_data.to_dict()
                if stock_data_dict and 'all_info' in stock_data_dict:
                    # Ensure the key is initialized
                    stock_with_past_data[stock] = [
                        entry['close'] for entry in stock_data_dict['all_info']
                        if 'close' in entry
                    ]

        return {
            "each_stock_dict": each_stock_dict,
            "stock_with_past_data": stock_with_past_data
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))









@app.get('/folio_analysis_gemini')
async def folio_analysis_gemini(token: str):
    uid = validate_token(token)

    if not uid:
        raise HTTPException(status_code=400, detail="Invalid user")

    try:
        user = auth.get_user(uid)
        email = user.email

        new_stock_ref = db.collection("users").document(email).collection("stocks")
        docs = new_stock_ref.stream()

        each_stock_dict = {}

        for doc in docs:
            current = doc.to_dict()
            if not current:
                continue
            name_of_stock = current.get('Name')
            stocks_bought = current.get('stocks_bought', 0)

            if not name_of_stock:
                continue  # Skip if stock name is missing

            if name_of_stock in each_stock_dict:
                each_stock_dict[name_of_stock] += stocks_bought
            else:
                each_stock_dict[name_of_stock] = stocks_bought

        print(f"Portfolio Data: {each_stock_dict}")

        try:
            gemini_model = genai.GenerativeModel("gemini-1.5-flash")
            print("Initialized")
        except Exception as e:
            print(f"Error initializing Gemini model: {str(e)}")
            raise HTTPException(status_code=500, detail="Failed to initialize Gemini model")

        # Generate content using the model
        try:
            response = gemini_model.generate_content(
                "I am giving you my stock portfolio information, with stocks I have bought and their amount, comment on the diversity of my portfolio in exactly 5 bullet points"
                + str(each_stock_dict)
            )
            print(f"Raw Response: {response}")

            # Ensure JSON serialization
            if hasattr(response, "to_dict"):
                response = response.to_dict()
            elif isinstance(response, (list, dict)):
                pass  # Already serializable
            else:
                response = str(response)  # Fallback to string representation

        except Exception as e:
            print(f"Error generating content with Gemini model: {str(e)}")
            raise HTTPException(status_code=500, detail="Error generating response from Gemini model")

        text_content = response["candidates"][0]["content"]["parts"][0]["text"]
        print(text_content)

        # Cleaning the data
        sentences = re.split(r'\.\s+|\n+', text_content)  # Splitting by period followed by space or newlines
        sentences = [sentence.strip() for sentence in sentences if sentence]  # Removing extra spaces and empty strings
        sentences = [sentence.replace("*", "") for sentence in sentences]  # Removing asterisks from each sentence

        print(sentences)
        return {
            "response": sentences
        }

    except Exception as e:
        # Log the error and return a 500 error with the message
        print(f"Error: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))







@app.post('/add_stock_for_user')
async def add_stock_for_user(stock_bought: str, amount: int, token : str):

    uid = validate_token(token)

    if not uid:
        raise HTTPException(status_code=400, detail="Invalid user")

    day_one = datetime.now() - timedelta(days=100)


    info_got = await api_response_dummy_tiingo(day_one,day_one,stock_bought)

    if info_got:
        amount_per_stock = info_got[0]['open']
    else:
        info_got = await api_response_dummy_polygon(day_one, day_one, stock_bought)
        if info_got:
            amount_per_stock = info_got['results'][0]['o']
        else:
            raise HTTPException(status_code=500, detail="Invalid stock data received")

    user= auth.get_user(uid)
    email=user.email

    new_stock_ref = db.collection("users").document(email).collection("stocks").document()
    new_stock_ref.set({
        "Name": stock_bought,
        "stock_price_that_time": amount_per_stock,
        "amount_spent": amount,
        "stocks_bought": amount / amount_per_stock,
        "date_of_purchase": datetime.now().date().isoformat(),
        "time_of_purchase": datetime.now().time().isoformat()
    })

    return {"message": "Stock information added successfully."}







@app.get('/api_response_dummy_tiingo')
async def api_response_dummy_tiingo(start_date: datetime, end_date: datetime, stock_symbol:str):
    headers = {
        'Content-Type': 'application/json'
    }
    url = f"https://api.tiingo.com/tiingo/daily/{stock_symbol}/prices"
    params = {
        'startDate': start_date,
        'endDate': end_date,
        'token': tiingo_api_key
    }

    try:
        response = requests.get(url, headers=headers, params=params)
        response.raise_for_status()
        return response.json()
    except requests.exceptions.RequestException as e:
        return {"error": str(e)}







@app.get('/api_response_dummy_polygon')
async def api_response_dummy_polygon(start_date: datetime, end_date: datetime, stock_symbol: str):
    headers = {
        'Content-Type': 'application/json'
    }

    start_date_str = start_date.strftime('%Y-%m-%d')
    end_date_str = end_date.strftime('%Y-%m-%d')

    url = f"https://api.polygon.io/v2/aggs/ticker/{stock_symbol}/range/1/day/{start_date_str}/{end_date_str}?apiKey={polygon_api_key}"

    try:
        response = requests.get(url, headers=headers)
        response.raise_for_status()
        return response.json()
    except requests.exceptions.RequestException as e:
        return {"error": str(e)}







@app.get('/get_searched_stock')
async def get_searched_stock(stock: str):

    start_date = datetime.now() - timedelta(days=30)
    end_date = datetime.now() - timedelta(days=5)

    headers = {
        'Content-Type': 'application/json'
    }
    url = f"https://api.tiingo.com/tiingo/daily/{stock}/prices"
    params = {
        'startDate': start_date,
        'endDate': end_date,
        'token': tiingo_api_key
    }

    try:
        response = requests.get(url, headers=headers, params=params)
        response.raise_for_status()
        return response.json()
    except requests.exceptions.RequestException as e:
        return {"error": str(e)}








@app.get('/compare_two_stocks')
async def compare_two_stocks(stock1: str, stock2: str):
    stock_1_dict=[]
    stock_2_dict=[]

    day_one = datetime.now() - timedelta(days=130)
    day_two = day_one + timedelta(days=30)

    from_tiingo_one= True
    from_tiingo_two= True

    info_got_one = await api_response_dummy_tiingo(day_one, day_two, stock1)
    if "error" in info_got_one:
        info_got_one = await api_response_dummy_polygon(day_one, day_two, stock1)
        from_tiingo_one=False

    info_got_two = await api_response_dummy_tiingo(day_one, day_two, stock2)
    if "error" in info_got_two:
        info_got_two = await api_response_dummy_polygon(day_one, day_two, stock2)
        from_tiingo_two=False

    if from_tiingo_one:
        for day in info_got_one:
            stock_1_dict.append(
                {
                    "close" : day["close"],
                    "high" : day["high"],
                    "low" : day["low"],
                    "open" : day["open"],

                }
            )
    else:
        for day in info_got_one['results']:
            stock_1_dict.append(
                {
                    "close" : day["c"],
                    "high" : day["h"],
                    "low" : day["l"],
                    "open" : day["o"],

                }
            )
    if from_tiingo_two:
        for day in info_got_two:
            stock_2_dict.append(
                {
                    "close": day["close"],
                    "high": day["high"],
                    "low": day["low"],
                    "open": day["open"],
                }
            )
    else:
        for day in info_got_two['results']:
            stock_2_dict.append(
                {
                    "close" : day["c"],
                    "high" : day["h"],
                    "low" : day["l"],
                    "open" : day["o"],

                }
            )
    return {
        "stock_1_dict":stock_1_dict,
        "stock_2_dict": stock_2_dict,
    }







@app.get('/get_order_history')
async def get_order_history(token : str):
    uid = validate_token(token)

    if not uid:
        raise HTTPException(status_code=400, detail="Invalid user")

    user = auth.get_user(uid)
    email = user.email

    new_stock_ref = db.collection("users").document(email).collection("stocks")
    docs = new_stock_ref.stream()

    each_order = []

    for doc in docs:
        current = doc.to_dict()
        if not current:
            continue
        each_order.append(current)

    return each_order






# this functions adds stock data for a stock for the last 160days uptill 20 days from today
@app.post('/add_stock_data_to_db')
async def add_stock_data_to_db():
    first_day = datetime.now() - timedelta(days=160)
    last_day = datetime.now() - timedelta(days=20)
    for stock_bought in stockOptions:
        # Reference to the stock document in Firestore (it will create it if it doesn't exist)
        stock_doc = db.collection("stocks_data").document(stock_bought)

        info_got = await api_response_dummy_tiingo(first_day, last_day, stock_bought)

        if not info_got:
            info_got = await api_response_dummy_polygon(first_day, last_day, stock_bought)
            if not info_got:
                print(f"Invalid stock data received for {stock_bought}")
                continue  # Move on to the next stock

        # Set (create or update) Firestore document
        stock_doc.set({
            "all_info": info_got
        })

    print("Stock information added successfully.")
    return {
        "message":
            "added I think"
    }








async def trigger_fill_database():
    async with httpx.AsyncClient() as client:
        try:
            response = await client.get("http://localhost:8000/hello")
            print(f"Response from /hello: {response.text}")
        except httpx.HTTPError as e:
            print(f"HTTP request failed: {e}")


# Set up scheduler

scheduler = AsyncIOScheduler()

# Schedule to run every 5 seconds (or daily at 12:00 PM)

trigger = CronTrigger(hour=12, minute=0, second=0)  # Runs every day at 12 pm
scheduler.add_job(trigger_fill_database, trigger=trigger)  # Call the async Python function




# Start the scheduler on app startup
@app.on_event("startup")
def start_scheduler():
    scheduler.start()
    print("Scheduler started!")


# Stop the scheduler on app shutdown
@app.on_event("shutdown")
def shutdown_scheduler():
    scheduler.shutdown()
    print("Scheduler stopped.")








@app.get('/hello')
async def hello():
    return "hello from endpoint"


@app.get('/get_count')
async def get_count():
    six_month_data_ref = db.collection("stocks_data")
    docs = six_month_data_ref.stream()
    return {"count": len(list(docs))}
