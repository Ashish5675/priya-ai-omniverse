import List "mo:core/List";
import Map "mo:core/Map";
import Time "mo:core/Time";
import Float "mo:core/Float";
import Nat "mo:core/Nat";
import Int "mo:core/Int";
import Text "mo:core/Text";
import TradingTypes "../types/trading";

module {
  // ── Seed stock catalogue ────────────────────────────────────────────────────
  public func seededStockData() : [TradingTypes.StockSymbol] {
    [
      { symbol = "TCS";       name = "Tata Consultancy Services";    sector = "IT" },
      { symbol = "INFY";      name = "Infosys Ltd";                  sector = "IT" },
      { symbol = "RELIANCE";  name = "Reliance Industries";          sector = "Energy" },
      { symbol = "HDFCBANK";  name = "HDFC Bank";                    sector = "Banking" },
      { symbol = "ICICIBANK"; name = "ICICI Bank";                   sector = "Banking" },
      { symbol = "SBIN";      name = "State Bank of India";          sector = "Banking" },
      { symbol = "WIPRO";     name = "Wipro Ltd";                    sector = "IT" },
      { symbol = "HCLTECH";   name = "HCL Technologies";             sector = "IT" },
      { symbol = "BAJFINANCE";name = "Bajaj Finance";                sector = "Finance" },
      { symbol = "MARUTI";    name = "Maruti Suzuki";                sector = "Automobile" },
      { symbol = "ONGC";      name = "Oil & Natural Gas Corp";       sector = "Energy" },
      { symbol = "COALINDIA"; name = "Coal India";                   sector = "Mining" },
      { symbol = "NTPC";      name = "NTPC Ltd";                     sector = "Power" },
      { symbol = "POWERGRID"; name = "Power Grid Corp";              sector = "Power" },
      { symbol = "SUNPHARMA"; name = "Sun Pharmaceutical";           sector = "Pharma" },
      { symbol = "DRREDDY";   name = "Dr Reddy's Laboratories";      sector = "Pharma" },
      { symbol = "ASIANPAINT";name = "Asian Paints";                 sector = "Consumer" },
      { symbol = "TITAN";     name = "Titan Company";                sector = "Consumer" },
      { symbol = "ADANIPORTS";name = "Adani Ports & SEZ";            sector = "Infrastructure" },
      { symbol = "NIFTY50";   name = "Nifty 50 Index Fund";          sector = "Index" },
    ]
  };

  // ── Base prices (INR) for deterministic simulation ─────────────────────────
  func basePrice(symbol : Text) : Float {
    if (symbol == "TCS")        { 3800.0 }
    else if (symbol == "INFY")       { 1450.0 }
    else if (symbol == "RELIANCE")   { 2500.0 }
    else if (symbol == "HDFCBANK")   { 1650.0 }
    else if (symbol == "ICICIBANK")  { 950.0  }
    else if (symbol == "SBIN")       { 620.0  }
    else if (symbol == "WIPRO")      { 470.0  }
    else if (symbol == "HCLTECH")    { 1200.0 }
    else if (symbol == "BAJFINANCE") { 7100.0 }
    else if (symbol == "MARUTI")     { 10500.0 }
    else if (symbol == "ONGC")       { 265.0  }
    else if (symbol == "COALINDIA")  { 455.0  }
    else if (symbol == "NTPC")       { 340.0  }
    else if (symbol == "POWERGRID")  { 280.0  }
    else if (symbol == "SUNPHARMA")  { 1550.0 }
    else if (symbol == "DRREDDY")    { 5800.0 }
    else if (symbol == "ASIANPAINT") { 2950.0 }
    else if (symbol == "TITAN")      { 3350.0 }
    else if (symbol == "ADANIPORTS") { 1320.0 }
    else if (symbol == "NIFTY50")    { 22000.0 }
    else { 1000.0 }
  };

  // ── Deterministic pseudo-random float in [-1, 1] from seed ─────────────────
  func pseudoRand(seed : Nat) : Float {
    let v = (seed * 1664525 + 1013904223) % 0x100000000;
    let f = (v % 1000).toFloat();
    (f / 500.0) - 1.0
  };

  // ── Simulate a single day price ─────────────────────────────────────────────
  public func getStockPrice(symbol : Text, date : Int) : TradingTypes.StockPrice {
    let base = basePrice(symbol);
    let seed = Int.abs(date / 86_400_000_000_000) % 99999 + symbol.size();
    let delta = pseudoRand(seed) * base * 0.02;
    let closeP = base + delta;
    let openP  = closeP - (pseudoRand(seed + 1) * base * 0.01);
    let highP  = closeP + Float.abs(pseudoRand(seed + 2) * base * 0.015);
    let lowP   = closeP - Float.abs(pseudoRand(seed + 3) * base * 0.015);
    let vol    = 500000 + (seed % 4500000);
    {
      symbol;
      open   = openP;
      high   = highP;
      low    = lowP;
      close  = closeP;
      volume = vol;
      date;
    }
  };

  // ── Simulate price history over N days ─────────────────────────────────────
  public func simulatePriceHistory(symbol : Text, days : Nat) : [TradingTypes.StockPrice] {
    let now = Time.now();
    let dayNs : Int = 86_400_000_000_000;
    Array.tabulate<TradingTypes.StockPrice>(
      days,
      func(i) {
        let date = now - (Int.fromNat(days - i) * dayNs);
        getStockPrice(symbol, date)
      }
    )
  };

  // ── Transaction helpers ─────────────────────────────────────────────────────
  public func addTransaction(
    transactions : List.List<TradingTypes.Transaction>,
    userId : Text,
    symbol : Text,
    action : TradingTypes.TransactionAction,
    quantity : Nat,
    price : Float,
    idCounter : { var value : Nat },
  ) {
    idCounter.value += 1;
    let tx : TradingTypes.Transaction = {
      id        = idCounter.value.toText();
      userId;
      symbol;
      action;
      quantity;
      price;
      timestamp = Time.now();
      note      = "[Simulation Only]";
    };
    transactions.add(tx);
  };

  // ── Portfolio calculation ───────────────────────────────────────────────────
  public func getPortfolio(
    transactions : List.List<TradingTypes.Transaction>,
    userId : Text,
  ) : TradingTypes.Portfolio {
    // Group by symbol: accumulate quantity and cost
    let holdMap = Map.empty<Text, { var qty : Nat; var totalCost : Float }>();
    transactions.forEach(func(tx) {
      if (tx.userId == userId) {
        let existing = holdMap.get(tx.symbol);
        switch existing {
          case null {
            let entry = { var qty : Nat = 0; var totalCost : Float = 0.0 };
            if (tx.action == #buy) {
              entry.qty := tx.quantity;
              entry.totalCost := tx.quantity.toFloat() * tx.price;
            };
            holdMap.add(tx.symbol, entry);
          };
          case (?entry) {
            switch (tx.action) {
              case (#buy)  {
                entry.qty := entry.qty + tx.quantity;
                entry.totalCost := entry.totalCost + tx.quantity.toFloat() * tx.price;
              };
              case (#sell) {
                let sold = if (tx.quantity > entry.qty) { entry.qty } else { tx.quantity };
                let frac = if (entry.qty == 0) { 0.0 } else {
                  sold.toFloat() / entry.qty.toFloat()
                };
                entry.totalCost := entry.totalCost * (1.0 - frac);
                entry.qty := if (sold > entry.qty) { 0 } else { entry.qty - sold };
              };
            };
          };
        };
      };
    });

    var totalValue : Float = 0.0;
    let holdings : [TradingTypes.Holding] =
      holdMap.entries()
        .filter(func((_, e)) { e.qty > 0 })
        .map(
          func((sym, e)) : TradingTypes.Holding {
            let currentPrice = getStockPrice(sym, Time.now()).close;
            let value = e.qty.toFloat() * currentPrice;
            totalValue := totalValue + value;
            let avgCost = if (e.qty == 0) { 0.0 } else { e.totalCost / e.qty.toFloat() };
            { symbol = sym; quantity = e.qty; avgCost }
          }
        ).toArray();

    { userId; holdings; totalValue; lastUpdated = Time.now() }
  };

  // ── Transaction history (sorted newest-first) ───────────────────────────────
  public func getTransactionHistory(
    transactions : List.List<TradingTypes.Transaction>,
    userId : Text,
  ) : [TradingTypes.Transaction] {
    let filtered = transactions.filter(func(tx) { tx.userId == userId });
    filtered.sort(func(a, b) { Int.compare(b.timestamp, a.timestamp) }).toArray()
  };
}
