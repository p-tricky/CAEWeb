<?php
class OrderApiController extends BaseController {
  public function index() {
    try {
      $ordersWithVendorName = DB::select("SELECT DISTINCT orders.id as id, orders.created_at, status, vendor_id, v.name as vendor_name, COUNT(1) as item_count FROM orders, order_item, item, vendor AS v WHERE orders.id = order_item.order_id AND order_item.item_id = item.id AND v.id = vendor_id GROUP BY orders.id, orders.created_at, status, v.name ORDER BY orders.id DESC");

      foreach ($ordersWithVendorName as $order) {
        $items = DB::select("SELECT item_id, name, order_qty from order_item, item WHERE item_id = item.id AND order_id =" . $order->id);
        $order->items = $items;
      }

      $orders = json_decode(json_encode((array)$ordersWithVendorName),true);
    
      for ($i = 0; $i < count($orders); $i++) {
        if ($orders[$i]['status'] == 0) {
          $orders[$i]['open'] = 'no';
          $orders[$i]['status'] = 0;
        } else {
          $orders[$i]['open'] = 'yes';
          $orders[$i]['status'] = 1;       
        }

      }
      
      return json_encode($orders);
    } catch(Exception $e) {
      return '{"error":{"text":' . $e->getMessage() . '}}';    }
  }

  public function store() {
    try {
      $createOrder = Input::json()->all();

      $addOrder = new Order;

      $addOrder->status = 1;

      $addOrder->save();

      $addOrderId = $addOrder->id;
      $numberOfItems = 0;

      foreach ($createOrder['items'] as $OrderItem) {

        $newOrderItem = new Order_Item;

        $newOrderItem->order_id = $addOrderId;
        $newOrderItem->item_id = $OrderItem['item_id'];
        $newOrderItem->order_qty = $OrderItem['order_qty'];
        $newOrderItem->save();

        $numberOfItems = $numberOfItems +1;
      }

      $addOrder->items = $createOrder['items'];
      $addOrder->open = 'yes';

      $vendorId = $createOrder['vendor_id'];
      $addOrder->vendor_id = $vendorId;

      $vendorName = Vendor::find($vendorId);

      $addOrder->vendor_name = $vendorName->name;
      $addOrder->item_count = $numberOfItems;

      $this->addOrderToEmail($addOrder);
      
      return $addOrder->toJson();
    } catch(Exception $e) {
      return '{"error":{"text":' . $e->getMessage() . '}}';
    }
  }

  public function update($id) {
    try {
      $updateModel = Input::json()->all();
        
      $updateOrder = Order::find($id);

      $updateOrder->status = $updateModel['status'];
      $updateOrder->save();

      if ($updateOrder->status == 0) {
        $updateOrder->open = 'no';
      } else {
        $updateOrder->open = 'yes';
      }

      return $updateOrder->toJson();
    } catch(Exception $e) {
      return '{"error":{"text":' . $e->getMessage() . '}}';
    }
  }

  private function addOrderToEmail($order) {
    try {

      $emailOrder = "Here is a list of items, quantities and associated URL's that need to be ordered.\n\n";

      $emailOrder = $emailOrder . "Order Number: " . $order->id . "\n";
      $emailOrder = $emailOrder . "Vendor Name: " . $order->vendor_name . "\n";
      $emailOrder = $emailOrder . "Items:\n";
      $emailOrder = $emailOrder . "\t" . str_pad("Item Name",20);
      $emailOrder = $emailOrder . str_pad("Quantity",10);
      $emailOrder = $emailOrder . "URL\n";

      foreach ($order->items as $item) {      

        $emailOrder = $emailOrder . "\t" . str_pad($item['name'],20);
        $emailOrder = $emailOrder . str_pad($item['order_qty'],10);
        $emailOrder = $emailOrder . $item['item_url'] . "\n";
      }
      $emailOrder = $emailOrder . "\n\n";

      //Need to add a TO and FROM email addres to make this work
      //In addition, the hosting server needs to be setup to send email
      //TODO: finish this
      $to = "";
      $subject = "CAE Order Created";
      $message = $emailOrder;
      $from = "noreply@loftythoughts.me";
      
      //mail($to, $subject, $message, "From: " . $from);
    } catch (exception $e) {
      echo '{"error":{"text":' . $e -> getMessage() . '}}';
    }
  }
}
