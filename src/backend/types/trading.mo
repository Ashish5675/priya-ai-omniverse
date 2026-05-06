module {
  public type StockSymbol = {
    symbol : Text;
    name : Text;
    sector : Text;
  };

  public type StockPrice = {
    symbol : Text;
    open : Float;
    high : Float;
    low : Float;
    close : Float;
    volume : Nat;
    date : Int;
  };

  public type Holding = {
    symbol : Text;
    quantity : Nat;
    avgCost : Float;
  };

  public type Portfolio = {
    userId : Text;
    holdings : [Holding];
    totalValue : Float;
    lastUpdated : Int;
  };

  public type TransactionAction = { #buy; #sell };

  public type Transaction = {
    id : Text;
    userId : Text;
    symbol : Text;
    action : TransactionAction;
    quantity : Nat;
    price : Float;
    timestamp : Int;
    note : Text;
  };
}
