const stockOptions = [
    { label: "Apple Inc.", value: "AAPL" },
    { label: "NVIDIA Corporation", value: "NVDA" },
    { label: "Microsoft Corporation", value: "MSFT" },
    { label: "Alphabet Inc.", value: "GOOG" },
    { label: "Alphabet Inc.", value: "GOOGL" },
    { label: "Amazon.com, Inc.", value: "AMZN" },
    { label: "Meta Platforms, Inc.", value: "META" },
    { label: "Berkshire Hathaway Inc.", value: "BRK.B" },
    { label: "Broadcom Inc.", value: "AVGO" },
    { label: "Eli Lilly and Company", value: "LLY" },
    { label: "Tesla, Inc.", value: "TSLA" },
    { label: "Walmart Inc.", value: "WMT" },
    { label: "JPMorgan Chase & Co.", value: "JPM" },
    { label: "Visa Inc.", value: "V" },
    { label: "Exxon Mobil Corporation", value: "XOM" },
    { label: "UnitedHealth Group Incorporated", value: "UNH" },
    { label: "Oracle Corporation", value: "ORCL" },
    { label: "Mastercard Incorporated", value: "MA" },
    { label: "The Home Depot, Inc.", value: "HD" },
    { label: "The Procter & Gamble Company", value: "PG" },
    { label: "Costco Wholesale Corporation", value: "COST" },
    { label: "Johnson & Johnson", value: "JNJ" },
    { label: "Netflix, Inc.", value: "NFLX" },
    { label: "AbbVie Inc.", value: "ABBV" },
    { label: "Bank of America Corporation", value: "BAC" },
    { label: "The Coca-Cola Company", value: "KO" },
    { label: "Salesforce, Inc.", value: "CRM" },
    { label: "Chevron Corporation", value: "CVX" },
    { label: "Merck & Co., Inc.", value: "MRK" },
    { label: "T-Mobile US, Inc.", value: "TMUS" },
    { label: "Advanced Micro Devices, Inc.", value: "AMD" },
    { label: "PepsiCo, Inc.", value: "PEP" },
    { label: "Accenture plc", value: "ACN" },
    { label: "Linde plc", value: "LIN" },
    { label: "Thermo Fisher Scientific Inc.", value: "TMO" },
    { label: "McDonald's Corporation", value: "MCD" },
    { label: "Cisco Systems, Inc.", value: "CSCO" },
    { label: "Adobe Inc.", value: "ADBE" },
    { label: "Wells Fargo & Company", value: "WFC" },
    { label: "International Business Machines Corporation", value: "IBM" },
    { label: "General Electric Company", value: "GE" },
    { label: "Abbott Laboratories", value: "ABT" },
    { label: "Danaher Corporation", value: "DHR" },
    { label: "American Express Company", value: "AXP" },
    { label: "Morgan Stanley", value: "MS" },
    { label: "Caterpillar Inc.", value: "CAT" },
    { label: "ServiceNow, Inc.", value: "NOW" },
    { label: "QUALCOMM Incorporated", value: "QCOM" },
    { label: "Philip Morris International Inc.", value: "PM" },
    { label: "Intuitive Surgical, Inc.", value: "ISRG" },
    { label: "Verizon Communications Inc.", value: "VZ" },
    { label: "Texas Instruments Incorporated", value: "TXN" },
    { label: "The Walt Disney Company", value: "DIS" },
    { label: "NextEra Energy, Inc.", value: "NEE" },
    { label: "Intuit Inc.", value: "INTU" },
    { label: "The Goldman Sachs Group, Inc.", value: "GS" },
    { label: "Amgen Inc.", value: "AMGN" },
    { label: "Uber Technologies, Inc.", value: "UBER" },
    { label: "RTX Corporation", value: "RTX" },
    { label: "Pfizer Inc.", value: "PFE" },
    { label: "S&P Global Inc.", value: "SPGI" },
    { label: "Lowe's Companies, Inc.", value: "LOW" },
    { label: "Comcast Corporation", value: "CMCSA" },
    { label: "AT&T Inc.", value: "T" },
    { label: "Applied Materials, Inc.", value: "AMAT" },
    { label: "BlackRock, Inc.", value: "BLK" },
    { label: "The Progressive Corporation", value: "PGR" },
    { label: "Lockheed Martin Corporation", value: "LMT" },
    { label: "Union Pacific Corporation", value: "UNP" },
    { label: "Booking Holdings Inc.", value: "BKNG" },
    { label: "Honeywell International Inc.", value: "HON" },
    { label: "Stryker Corporation", value: "SYK" },
    { label: "Eaton Corporation plc", value: "ETN" },
    { label: "The TJX Companies, Inc.", value: "TJX" },
    { label: "Boston Scientific Corporation", value: "BSX" },
    { label: "The Charles Schwab Corporation", value: "SCHW" },
    { label: "Blackstone Inc.", value: "BX" },
    { label: "Arista Networks, Inc.", value: "ANET" },
    { label: "KKR & Co. Inc.", value: "KKR" },
    { label: "Vertex Pharmaceuticals Incorporated", value: "VRTX" },
    { label: "Palo Alto Networks, Inc.", value: "PANW" },
    { label: "ConocoPhillips", value: "COP" },
    { label: "NIKE, Inc.", value: "NKE" },
    { label: "Micron Technology, Inc.", value: "MU" },
    { label: "Automatic Data Processing, Inc.", value: "ADP" },
    { label: "Citigroup Inc.", value: "C" },
    { label: "Medtronic plc", value: "MDT" },
    { label: "Chubb Limited", value: "CB" },
    { label: "Fiserv, Inc.", value: "FI" },
    { label: "United Parcel Service, Inc.", value: "UPS" },
    { label: "Analog Devices, Inc.", value: "ADI" },
    { label: "Deere & Company", value: "DE" },
    { label: "Starbucks Corporation", value: "SBUX" },
    { label: "Marsh & McLennan Companies, Inc.", value: "MMC" },
    { label: "Prologis, Inc.", value: "PLD" },
    { label: "Gilead Sciences, Inc.", value: "GILD" },
    { label: "HCA Healthcare, Inc.", value: "HCA" },
    { label: "Bristol-Myers Squibb Company", value: "BMY" },
    { label: "Regeneron Pharmaceuticals, Inc.", value: "REGN" },
    { label: "American Tower Corporation", value: "AMT" },
    { label: "The Southern Company", value: "SO" },
    { label: "The Boeing Company", value: "BA" },
    { label: "Elevance Health, Inc.", value: "ELV" },
    { label: "Intel Corporation", value: "INTC" },
    { label: "The Sherwin-Williams Company", value: "SHW" },
    { label: "Palantir Technologies Inc.", value: "PLTR" },
    { label: "Intercontinental Exchange, Inc.", value: "ICE" },
    { label: "Lam Research Corporation", value: "LRCX" },
    { label: "Mondelez International, Inc.", value: "MDLZ" },
    { label: "Duke Energy Corporation", value: "DUK" },
    { label: "Trane Technologies plc", value: "TT" },
    { label: "KLA Corporation", value: "KLAC" },
    { label: "The Cigna Group", value: "CI" },
    { label: "Moody's Corporation", value: "MCO" },
    { label: "Dell Technologies Inc.", value: "DELL" },
    { label: "Airbnb, Inc.", value: "ABNB" },
    { label: "Zoetis Inc.", value: "ZTS" },
    { label: "Constellation Energy Corporation", value: "CEG" },
    { label: "Cintas Corporation", value: "CTAS" },
    { label: "Waste Management, Inc.", value: "WM" },
    { label: "General Dynamics Corporation", value: "GD" },
    { label: "Altria Group, Inc.", value: "MO" },
    { label: "Equinix, Inc.", value: "EQIX" },
    { label: "PayPal Holdings, Inc.", value: "PYPL" },
    { label: "Parker-Hannifin Corporation", value: "PH" },
    { label: "CME Group Inc.", value: "CME" },
    { label: "Chipotle Mexican Grill, Inc.", value: "CMG" },
    { label: "Colgate-Palmolive Company", value: "CL" },
    { label: "Amphenol Corporation", value: "APH" },
    { label: "Welltower Inc.", value: "WELL" },
    { label: "Motorola Solutions, Inc.", value: "MSI" },
    { label: "TransDigm Group Incorporated", value: "TDG" },
    { label: "Synopsys, Inc.", value: "SNPS" },
    { label: "Aon plc", value: "AON" },
    { label: "Northrop Grumman Corporation", value: "NOC" },
    { label: "Illinois Tool Works Inc.", value: "ITW" },
    { label: "GE Vernova Inc.", value: "GEV" },
    { label: "CrowdStrike Holdings, Inc.", value: "CRWD" },
    { label: "U.S. Bancorp", value: "USB" },
    { label: "Marriott International, Inc.", value: "MAR" },
    { label: "3M Company", value: "MMM" },
    { label: "Ecolab Inc.", value: "ECL" },
    { label: "Air Products and Chemicals, Inc.", value: "APD" },
    { label: "The PNC Financial Services Group, Inc.", value: "PNC" },
    { label: "Carrier Global Corporation", value: "CARR" },
    { label: "CVS Health Corporation", value: "CVS" },
    { label: "EOG Resources, Inc.", value: "EOG" },
    { label: "O'Reilly Automotive, Inc.", value: "ORLY" },
    { label: "Becton, Dickinson and Company", value: "BDX" },
    { label: "Target Corporation", value: "TGT" },
    { label: "Cadence Design Systems, Inc.", value: "CDNS" },
    { label: "Freeport-McMoRan Inc.", value: "FCX" },
    { label: "McKesson Corporation", value: "MCK" },
    { label: "Newmont Corporation", value: "NEM" },
    { label: "FedEx Corporation", value: "FDX" },
    { label: "CSX Corporation", value: "CSX" },
    { label: "Republic Services, Inc.", value: "RSG" },
    { label: "Arthur J. Gallagher & Co.", value: "AJG" },
    { label: "The Williams Companies, Inc.", value: "WMB" },
    { label: "Emerson Electric Co.", value: "EMR" },
    { label: "Aflac Incorporated", value: "AFL" },
    { label: "Fortinet, Inc.", value: "FTNT" },
    { label: "Autodesk, Inc.", value: "ADSK" },
    { label: "D.R. Horton, Inc.", value: "DHI" },
    { label: "Capital One Financial Corporation", value: "COF" },
    { label: "Schlumberger Limited", value: "SLB" },
    { label: "Roper Technologies, Inc.", value: "ROP" },
    { label: "MetLife, Inc.", value: "MET" },
    { label: "The Travelers Companies, Inc.", value: "TRV" },
    { label: "NXP Semiconductors N.V.", value: "NXPI" },
    { label: "Hilton Worldwide Holdings Inc.", value: "HLT" },
    { label: "Public Storage", value: "PSA" },
    { label: "PACCAR Inc", value: "PCAR" },
    { label: "Simon Property Group, Inc.", value: "SPG" },
    { label: "ONEOK, Inc.", value: "OKE" },
    { label: "Truist Financial Corporation", value: "TFC" },
    { label: "Norfolk Southern Corporation", value: "NSC" },
    { label: "Realty Income Corporation", value: "O" },
    { label: "The Bank of New York Mellon Corporation", value: "BK" },
    { label: "United Rentals, Inc.", value: "URI" },
    { label: "General Motors Company", value: "GM" },
    { label: "Phillips 66", value: "PSX" },
    { label: "Kinder Morgan, Inc.", value: "KMI" },
    { label: "W.W. Grainger, Inc.", value: "GWW" },
    { label: "AutoZone, Inc.", value: "AZO" },
    { label: "Digital Realty Trust, Inc.", value: "DLR" },
    { label: "Sempra", value: "SRE" },
    { label: "Diamondback Energy, Inc.", value: "FANG" },
    { label: "Royal Caribbean Cruises Ltd.", value: "RCL" },
    { label: "American Electric Power Company, Inc.", value: "AEP" },
    { label: "Monster Beverage Corporation", value: "MNST" },
    { label: "Marathon Petroleum Corporation", value: "MPC" },
    { label: "Johnson Controls International plc", value: "JCI" },
    { label: "Ameriprise Financial, Inc.", value: "AMP" },
    { label: "The Allstate Corporation", value: "ALL" },
    { label: "Paychex, Inc.", value: "PAYX" },
    { label: "Copart, Inc.", value: "CPRT" },
    { label: "Dominion Energy, Inc.", value: "D" },
    { label: "Keurig Dr Pepper Inc.", value: "KDP" },
    { label: "American International Group, Inc.", value: "AIG" },
    { label: "Fidelity National Information Services, Inc.", value: "FIS" },
    { label: "Lennar Corporation", value: "LEN" },
    { label: "Fair Isaac Corporation", value: "FICO" },
    { label: "Ross Stores, Inc.", value: "ROST" },
    { label: "Kimberly-Clark Corporation", value: "KMB" },
    { label: "Occidental Petroleum Corporation", value: "OXY" },
    { label: "Crown Castle Inc.", value: "CCI" },
    { label: "MSCI Inc.", value: "MSCI" },
    { label: "L3Harris Technologies, Inc.", value: "LHX" },
    { label: "Quanta Services, Inc.", value: "PWR" },
    { label: "Cencora, Inc.", value: "COR" },
    { label: "Cummins Inc.", value: "CMI" },
    { label: "Charter Communications, Inc.", value: "CHTR" },
    { label: "Public Service Enterprise Group Incorporated", value: "PEG" },
    { label: "Prudential Financial, Inc.", value: "PRU" },
    { label: "TE Connectivity plc", value: "TEL" },
    { label: "Vistra Corp.", value: "VST" },
    { label: "Fastenal Company", value: "FAST" },
    { label: "Kenvue Inc.", value: "KVUE" },
    { label: "PG&E Corporation", value: "PCG" },
    { label: "Constellation Brands, Inc.", value: "STZ" },
    { label: "Valero Energy Corporation", value: "VLO" },
    { label: "Howmet Aerospace Inc.", value: "HWM" },
    { label: "Ford Motor Company", value: "F" },
    { label: "Monolithic Power Systems, Inc.", value: "MPWR" },
    { label: "The Kraft Heinz Company", value: "KHC" },
    { label: "Hess Corporation", value: "HES" },
    { label: "Nasdaq, Inc.", value: "NDAQ" },
    { label: "Old Dominion Freight Line, Inc.", value: "ODFL" },
    { label: "Otis Worldwide Corporation", value: "OTIS" },
    { label: "Edwards Lifesciences Corporation", value: "EW" },
    { label: "IQVIA Holdings Inc.", value: "IQV" },
    { label: "Corteva, Inc.", value: "CTVA" },
    { label: "GE HealthCare Technologies Inc.", value: "GEHC" },
    { label: "Gartner, Inc.", value: "IT" },
    { label: "The Kroger Co.", value: "KR" },
    { label: "Arch Capital Group Ltd.", value: "ACGL" },
    { label: "Exelon Corporation", value: "EXC" },
    { label: "Ingersoll Rand Inc.", value: "IR" },
    { label: "Microchip Technology Incorporated", value: "MCHP" },
    { label: "Corning Incorporated", value: "GLW" },
    { label: "Agilent Technologies, Inc.", value: "A" },
    { label: "AMETEK, Inc.", value: "AME" },
    { label: "Electronic Arts Inc.", value: "EA" },
    { label: "Verisk Analytics, Inc.", value: "VRSK" },
    { label: "General Mills, Inc.", value: "GIS" },
    { label: "Cognizant Technology Solutions Corporation", value: "CTSH" },
    { label: "Las Vegas Sands Corp.", value: "LVS" },
    { label: "Yum! Brands, Inc.", value: "YUM" },
    { label: "The Hershey Company", value: "HSY" },
    { label: "IDEXX Laboratories, Inc.", value: "IDXX" },
    { label: "CBRE Group, Inc.", value: "CBRE" },
    { label: "Nucor Corporation", value: "NUE" },
    { label: "Consolidated Edison, Inc.", value: "ED" },
    { label: "Discover Financial Services", value: "DFS" },
    { label: "Sysco Corporation", value: "SYY" },
    { label: "Dow Inc.", value: "DOW" },
    { label: "Lululemon Athletica Inc.", value: "LULU" },
    { label: "Baker Hughes Company", value: "BKR" },
    { label: "Iron Mountain Incorporated", value: "IRM" },
    { label: "DuPont de Nemours, Inc.", value: "DD" },
    { label: "The Hartford Financial Services Group, Inc.", value: "HIG" },
    { label: "Targa Resources Corp.", value: "TRGP" },
    { label: "Xcel Energy Inc.", value: "XEL" },
    { label: "Delta Air Lines, Inc.", value: "DAL" },
    { label: "Martin Marietta Materials, Inc.", value: "MLM" },
    { label: "ResMed Inc.", value: "RMD" },
    { label: "HP Inc.", value: "HPQ" },
    { label: "Extra Space Storage Inc.", value: "EXR" },
    { label: "Vulcan Materials Company", value: "VMC" },
    { label: "Equifax Inc.", value: "EFX" },
    { label: "VICI Properties Inc.", value: "VICI" },
    { label: "Axon Enterprise, Inc.", value: "AXON" },
    { label: "Westinghouse Air Brake Technologies Corporation", value: "WAB" },
    { label: "Edison International", value: "EIX" },
    { label: "AvalonBay Communities, Inc.", value: "AVB" },
    { label: "M&T Bank Corporation", value: "MTB" },
    { label: "Xylem Inc.", value: "XYL" },
    { label: "Centene Corporation", value: "CNC" },
    { label: "The Estée Lauder Companies Inc.", value: "EL" },
    { label: "Garmin Ltd.", value: "GRMN" },
    { label: "Tractor Supply Company", value: "TSCO" },
    { label: "CoStar Group, Inc.", value: "CSGP" },
    { label: "WEC Energy Group, Inc.", value: "WEC" },
    { label: "eBay Inc.", value: "EBAY" },
    { label: "Humana Inc.", value: "HUM" },
    { label: "Rockwell Automation, Inc.", value: "ROK" },
    { label: "Brown & Brown, Inc.", value: "BRO" },
    { label: "PulteGroup, Inc.", value: "PHM" },
    { label: "PPG Industries, Inc.", value: "PPG" },
    { label: "NVR, Inc.", value: "NVR" },
    { label: "Willis Towers Watson Public Limited Company", value: "WTW" },
    { label: "CDW Corporation", value: "CDW" },
    { label: "Fifth Third Bancorp", value: "FITB" },
    { label: "LyondellBasell Industries N.V.", value: "LYB" },
    { label: "DexCom, Inc.", value: "DXCM" },
    { label: "Mettler-Toledo International Inc.", value: "MTD" },
    { label: "Entergy Corporation", value: "ETR" },
    { label: "ON Semiconductor Corporation", value: "ON" },
    { label: "ANSYS, Inc.", value: "ANSS" },
    { label: "Raymond James Financial, Inc.", value: "RJF" },
    { label: "Equity Residential", value: "EQR" },
    { label: "Super Micro Computer, Inc.", value: "SMCI" },
    { label: "Kellanova", value: "K" },
    { label: "Veralto Corporation", value: "VLTO" },
    { label: "Carnival Corporation & plc", value: "CCL" },
    { label: "Take-Two Interactive Software, Inc.", value: "TTWO" },
    { label: "American Water Works Company, Inc.", value: "AWK" },
    { label: "Keysight Technologies, Inc.", value: "KEYS" },
    { label: "Cardinal Health, Inc.", value: "CAH" },
    { label: "Fortive Corporation", value: "FTV" },
    { label: "State Street Corporation", value: "STT" },
    { label: "Biogen Inc.", value: "BIIB" },
    { label: "Archer-Daniels-Midland Company", value: "ADM" },
    { label: "Ventas, Inc.", value: "VTR" },
    { label: "International Flavors & Fragrances Inc.", value: "IFF" },
    { label: "Dover Corporation", value: "DOV" },
    { label: "DTE Energy Company", value: "DTE" },
    { label: "Live Nation Entertainment, Inc.", value: "LYV" },
    { label: "Devon Energy Corporation", value: "DVN" },
    { label: "SBA Communications Corporation", value: "SBAC" },
    { label: "Hewlett Packard Enterprise Company", value: "HPE" },
    { label: "NetApp, Inc.", value: "NTAP" },
    { label: "Broadridge Financial Solutions, Inc.", value: "BR" },
    { label: "Church & Dwight Co., Inc.", value: "CHD" },
    { label: "Global Payments Inc.", value: "GPN" },
    { label: "T. Rowe Price Group, Inc.", value: "TROW" },
    { label: "FirstEnergy Corp.", value: "FE" },
    { label: "Tyler Technologies, Inc.", value: "TYL" },
    { label: "Erie Indemnity Company", value: "ERIE" },
    { label: "Halliburton Company", value: "HAL" },
    { label: "Hubbell Incorporated", value: "HUBB" },
    { label: "Deckers Outdoor Corporation", value: "DECK" },
    { label: "United Airlines Holdings, Inc.", value: "UAL" },
    { label: "Corpay, Inc.", value: "CPAY" },
    { label: "PPL Corporation", value: "PPL" },
    { label: "Rollins, Inc.", value: "ROL" },
    { label: "Seagate Technology Holdings plc", value: "STX" },
    { label: "Eversource Energy", value: "ES" },
    { label: "Ameren Corporation", value: "AEE" },
    { label: "Weyerhaeuser Company", value: "WY" },
    { label: "W. R. Berkley Corporation", value: "WRB" },
    { label: "GoDaddy Inc.", value: "GDDY" },
    { label: "Western Digital Corporation", value: "WDC" },
    { label: "Smurfit Westrock Plc", value: "SW" },
    { label: "Leidos Holdings, Inc.", value: "LDOS" },
    { label: "Brown-Forman Corporation", value: "BF.B" },
    { label: "Cboe Global Markets, Inc.", value: "CBOE" },
    { label: "PTC Inc.", value: "PTC" },
    { label: "Huntington Bancshares Incorporated", value: "HBAN" },
    { label: "STERIS plc", value: "STE" },
    { label: "Atmos Energy Corporation", value: "ATO" },
    { label: "Synchrony Financial", value: "SYF" },
    { label: "Cincinnati Financial Corporation", value: "CINF" },
    { label: "EQT Corporation", value: "EQT" },
    { label: "Regions Financial Corporation", value: "RF" },
    { label: "Builders FirstSource, Inc.", value: "BLDR" },
    { label: "Zimmer Biomet Holdings, Inc.", value: "ZBH" },
    { label: "CMS Energy Corporation", value: "CMS" },
    { label: "The Cooper Companies, Inc.", value: "COO" },
    { label: "Expedia Group, Inc.", value: "EXPE" },
    { label: "Tyson Foods, Inc.", value: "TSN" },
    { label: "First Solar, Inc.", value: "FSLR" },
    { label: "McCormick & Company, Incorporated", value: "MKC" },
    { label: "Teledyne Technologies Incorporated", value: "TDY" },
    { label: "Alexandria Real Estate Equities, Inc.", value: "ARE" },
    { label: "West Pharmaceutical Services, Inc.", value: "WST" },
    { label: "Principal Financial Group, Inc.", value: "PFG" },
    { label: "Moderna, Inc.", value: "MRNA" },
    { label: "Invitation Homes Inc.", value: "INVH" },
    { label: "Steel Dynamics, Inc.", value: "STLD" },
    { label: "Teradyne, Inc.", value: "TER" },
    { label: "Waters Corporation", value: "WAT" },
    { label: "Omnicom Group Inc.", value: "OMC" },
    { label: "Ball Corporation", value: "BALL" },
    { label: "Best Buy Co., Inc.", value: "BBY" },
    { label: "Genuine Parts Company", value: "GPC" },
    { label: "The Clorox Company", value: "CLX" },
    { label: "CenterPoint Energy, Inc.", value: "CNP" },
    { label: "Packaging Corporation of America", value: "PKG" },
    { label: "Northern Trust Corporation", value: "NTRS" },
    { label: "Darden Restaurants, Inc.", value: "DRI" },
    { label: "Fox Corporation", value: "FOXA" },
    { label: "Zebra Technologies Corporation", value: "ZBRA" },
    { label: "Hologic, Inc.", value: "HOLX" },
    { label: "Essex Property Trust, Inc.", value: "ESS" },
    { label: "Baxter International Inc.", value: "BAX" },
    { label: "Aptiv PLC", value: "APTV" },
    { label: "Warner Bros. Discovery, Inc.", value: "WBD" },
    { label: "Fox Corporation", value: "FOX" },
    { label: "Masco Corporation", value: "MAS" },
    { label: "Citizens Financial Group, Inc.", value: "CFG" },
    { label: "VeriSign, Inc.", value: "VRSN" },
    { label: "Southwest Airlines Co.", value: "LUV" },
    { label: "Labcorp Holdings Inc.", value: "LH" },
    { label: "J.B. Hunt Transport Services, Inc.", value: "JBHT" },
    { label: "Dollar General Corporation", value: "DG" },
    { label: "NRG Energy, Inc.", value: "NRG" },
    { label: "FactSet Research Systems Inc.", value: "FDS" },
    { label: "Mid-America Apartment Communities, Inc.", value: "MAA" },
    { label: "Jacobs Solutions Inc.", value: "J" },
    { label: "Loews Corporation", value: "L" },
    { label: "Coterra Energy Inc.", value: "CTRA" },
    { label: "Ulta Beauty, Inc.", value: "ULTA" },
    { label: "Avery Dennison Corporation", value: "AVY" },
    { label: "Hormel Foods Corporation", value: "HRL" },
    { label: "Snap-on Incorporated", value: "SNA" },
    { label: "Expeditors International of Washington, Inc.", value: "EXPD" },
    { label: "KeyCorp", value: "KEY" },
    { label: "Molina Healthcare, Inc.", value: "MOH" },
    { label: "Textron Inc.", value: "TXT" },
    { label: "Everest Group, Ltd.", value: "EG" },
    { label: "Insulet Corporation", value: "PODD" },
    { label: "Gen Digital Inc.", value: "GEN" },
    { label: "Quest Diagnostics Incorporated", value: "DGX" },
    { label: "International Paper Company", value: "IP" },
    { label: "Pentair plc", value: "PNR" },
    { label: "Stanley Black & Decker, Inc.", value: "SWK" },
    { label: "Kimco Realty Corporation", value: "KIM" },
    { label: "Align Technology, Inc.", value: "ALGN" },
    { label: "Akamai Technologies, Inc.", value: "AKAM" },
    { label: "Amcor plc", value: "AMCR" },
    { label: "IDEX Corporation", value: "IEX" },
    { label: "Alliant Energy Corporation", value: "LNT" },
    { label: "NiSource Inc.", value: "NI" },
    { label: "Universal Health Services, Inc.", value: "UHS" },
    { label: "Healthpeak Properties, Inc.", value: "DOC" },
    { label: "Skyworks Solutions, Inc.", value: "SWKS" },
    { label: "News Corporation", value: "NWS" },
    { label: "CF Industries Holdings, Inc.", value: "CF" },
    { label: "News Corporation", value: "NWSA" },
    { label: "Domino's Pizza, Inc.", value: "DPZ" },
    { label: "Marathon Oil Corporation", value: "MRO" },
    { label: "Trimble Inc.", value: "TRMB" },
    { label: "Revvity, Inc.", value: "RVTY" },
    { label: "Celanese Corporation", value: "CE" },
    { label: "Nordson Corporation", value: "NDSN" },
    { label: "Dollar Tree, Inc.", value: "DLTR" },
    { label: "UDR, Inc.", value: "UDR" },
    { label: "Jabil Inc.", value: "JBL" },
    { label: "Conagra Brands, Inc.", value: "CAG" },
    { label: "Evergy, Inc.", value: "EVRG" },
    { label: "Campbell Soup Company", value: "CPB" },
    { label: "Viatris Inc.", value: "VTRS" },
    { label: "Pool Corporation", value: "POOL" },
    { label: "BXP, Inc.", value: "BXP" },
    { label: "DaVita Inc.", value: "DVA" },
    { label: "Jack Henry & Associates, Inc.", value: "JKHY" },
    { label: "Allegion plc", value: "ALLE" },
    { label: "Regency Centers Corporation", value: "REG" },
    { label: "Juniper Networks, Inc.", value: "JNPR" },
    { label: "C.H. Robinson Worldwide, Inc.", value: "CHRW" },
    { label: "The J. M. Smucker Company", value: "SJM" },
    { label: "F5, Inc.", value: "FFIV" },
    { label: "Solventum Corporation", value: "SOLV" },
    { label: "Ralph Lauren Corporation", value: "RL" },
    { label: "Eastman Chemical Company", value: "EMN" },
    { label: "Camden Property Trust", value: "CPT" },
    { label: "Bunge Global SA", value: "BG" },
    { label: "Incyte Corporation", value: "INCY" },
    { label: "Host Hotels & Resorts, Inc.", value: "HST" },
    { label: "MGM Resorts International", value: "MGM" },
    { label: "Enphase Energy, Inc.", value: "ENPH" },
    { label: "The AES Corporation", value: "AES" },
    { label: "The Interpublic Group of Companies, Inc.", value: "IPG" },
    { label: "Molson Coors Beverage Company", value: "TAP" },
    { label: "A. O. Smith Corporation", value: "AOS" },
    { label: "EPAM Systems, Inc.", value: "EPAM" },
    { label: "Bio-Techne Corporation", value: "TECH" },
    { label: "CarMax, Inc.", value: "KMX" },
    { label: "Teleflex Incorporated", value: "TFX" },
    { label: "Albemarle Corporation", value: "ALB" },
    { label: "Lamb Weston Holdings, Inc.", value: "LW" },
    { label: "Catalent, Inc.", value: "CTLT" },
    { label: "MarketAxess Holdings Inc.", value: "MKTX" },
    { label: "Wynn Resorts, Limited", value: "WYNN" },
    { label: "Franklin Resources, Inc.", value: "BEN" },
    { label: "Norwegian Cruise Line Holdings Ltd.", value: "NCLH" },
    { label: "Tapestry, Inc.", value: "TPR" },
    { label: "Huntington Ingalls Industries, Inc.", value: "HII" },
    { label: "Dayforce Inc.", value: "DAY" },
    { label: "LKQ Corporation", value: "LKQ" },
    { label: "Mohawk Industries, Inc.", value: "MHK" },
    { label: "Charles River Laboratories International, Inc.", value: "CRL" },
    { label: "Assurant, Inc.", value: "AIZ" },
    { label: "Hasbro, Inc.", value: "HAS" },
    { label: "Generac Holdings Inc.", value: "GNRC" },
    { label: "Pinnacle West Capital Corporation", value: "PNW" },
    { label: "Globe Life Inc.", value: "GL" },
    { label: "Match Group, Inc.", value: "MTCH" },
    { label: "Qorvo, Inc.", value: "QRVO" },
    { label: "Caesars Entertainment, Inc.", value: "CZR" },
    { label: "Federal Realty Investment Trust", value: "FRT" },
    { label: "Paycom Software, Inc.", value: "PAYC" },
    { label: "APA Corporation", value: "APA" },
    { label: "Henry Schein, Inc.", value: "HSIC" },
    { label: "Walgreens Boots Alliance, Inc.", value: "WBA" },
    { label: "The Mosaic Company", value: "MOS" },
    { label: "Invesco Ltd.", value: "IVZ" },
    { label: "BorgWarner Inc.", value: "BWA" },
    { label: "FMC Corporation", value: "FMC" },
    { label: "Paramount Global", value: "PARA" },
    { label: "Bath & Body Works, Inc.", value: "BBWI" }
];

export default stockOptions;