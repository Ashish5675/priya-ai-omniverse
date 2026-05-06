import List "mo:core/List";
import Time "mo:core/Time";
import TradingTypes "../types/trading";
import TradingLib "../lib/trading";

mixin (
  transactions : List.List<TradingTypes.Transaction>,
  txIdCounter   : { var value : Nat },
) {
  // ── Read-only ───────────────────────────────────────────────────────────────
  public query func getStockSymbols() : async [TradingTypes.StockSymbol] {
    TradingLib.seededStockData()
  };

  public query func getStockPrice(symbol : Text) : async TradingTypes.StockPrice {
    TradingLib.getStockPrice(symbol, Time.now())
  };

  public query func getStockHistory(symbol : Text, days : Nat) : async [TradingTypes.StockPrice] {
    TradingLib.simulatePriceHistory(symbol, days)
  };

  public query func getPortfolio(userId : Text) : async TradingTypes.Portfolio {
    TradingLib.getPortfolio(transactions, userId)
  };

  public query func getTransactionHistory(userId : Text) : async [TradingTypes.Transaction] {
    TradingLib.getTransactionHistory(transactions, userId)
  };

  // ── Simulated trade (update) ────────────────────────────────────────────────
  public shared func executeSimulatedTrade(
    userId   : Text,
    symbol   : Text,
    action   : TradingTypes.TransactionAction,
    quantity : Nat,
  ) : async TradingTypes.Transaction {
    let price = TradingLib.getStockPrice(symbol, Time.now()).close;
    TradingLib.addTransaction(transactions, userId, symbol, action, quantity, price, txIdCounter);
    // Return the last inserted transaction
    switch (transactions.last()) {
      case (?tx) tx;
      case null { Runtime.trap("trade insert failed") };
    }
  };
}
