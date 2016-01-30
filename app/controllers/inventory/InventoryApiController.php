<?php
class InventoryApiController extends BaseController {
  public function index() {
    try {
      $items = Item::where('active', '=', '1')->orderBy('vendor_id')->orderBy('name')->get();
      foreach ($items as $item) {
        $item->vendor_name = Vendor::where('id', '=', $item->vendor_id)->pluck('name');
      }

      return $items->toJSON();
    } catch(Exception $e) {
      return json_encode('{"error":{"text":' . $e->getMessage() . '}}');
    }
  }

  //called when adding a new item
  public function store() {
    try {
      $addModel = Input::json()->all();
      //select the vendor name of the new selected vendor
      $vendorQueryResult = Vendor::find($addModel['vendor_id']);
      $newVendorName = $vendorQueryResult->name;

      //creates the new item, sets the properties, and saves it
      $addItem = new Item;

      $addItem->description = $addModel['description'];
      $addItem->email_threshold = $addModel['email_threshold'];
      $addItem->item_url = $addModel['item_url'];
      $addItem->name = $addModel['name'];
      $addItem->on_order_quantity = $addModel['on_order_quantity'];
      $addItem->quantity = $addModel['quantity'];
      $addItem->vendor_id = $addModel['vendor_id'];
      $addItem->active = 1;

      $addItem->save();

      $addItem->adjustmentQty = 0;
      $addItem->vendor_name = $newVendorName;

      return $addItem->toJson();
    } catch(Exception $e) {
      return json_encode('{"error":{"text":' . $e->getMessage() . '}}');
    }
  }

  public function update($id) {
    try{
      //get the json from the request.
      $updateModel = Input::json()->all();

      //select the vendor name of the new selected vendor
      $vendorQueryResult = Vendor::find($updateModel['vendor_id']);
      $newVendorName = $vendorQueryResult->name;
      
      //update the item model based on the json data sent.
      $updateItem = Item::find($id);
      $updateItem->description = $updateModel['description'];
      $updateItem->email_threshold = $updateModel['email_threshold'];
      $updateItem->item_url = $updateModel['item_url'];
      $updateItem->name = $updateModel['name'];
      $updateItem->on_order_quantity = $updateModel['on_order_quantity'];
      $updateItem->vendor_id = $updateModel['vendor_id'];

      $updateItem->quantity = ($updateItem->quantity + $updateModel['adjustmentQty']);
      if ($updateItem->quantity < 0) {
        $updateItem->quantity = 0;
      }

      //save the updated item to the database
      $updateItem->save();

      //append the new vendor name to the model to send back in the response
      $updateItem->vendor_name = $newVendorName;
      $updateItem->adjustmentQty = 0;

      //send the response
      echo $updateItem->toJson();
    } catch(Exception $e) {
      return json_encode('{"error":{"text":' . $e->getMessage() . '}}');
    }
  }

  //This will send an email when an item is low
    public function sendEmail() {
    //get all items that are low
    $items = Item::whereRaw('quantity <= email_threshold')->where('active', '=', 1)->get();

    //mails to Coordinators 
    $to = implode(', ', DB::table('users')->where('positions_id', '=', 6)->lists('email'));

    //Declares the subject for the email
    $subject = "Low Inventory Update";

    //"From:"" Header
    $headers = 'From: Inventory Updater' . "\r\n"; 

    //first two lines of the message
    $message = "-Automated message from Inventory Control System-\r\nThe following items need to be ordered:\r\n\r\n\r\n";

    //for each item, it formats the output and adds it to the message
    foreach ($items as $item) {
      $vendorId = Vendor::where('id', '=', $item->vendor_id)->pluck('name');
      $message .= $item->name . " | On-Hand: " . $item->quantity . "\r\n";
      $message .= "Email Threshold set for order prompt at " . $item->email_threshold . " remaining.\r\n";
      $message .= "Order from " . $vendorId . " at " . $item->item_url . "\r\n\r\n";
    }

    //adds the final lines to message. 
    $message .= "\r\nThe inventory site can be reached at: https://loftythoughts.me/caeweb/inventory/ \r\n"; 
    $signature = "\r\n\r\nCAE Center";
    $message .= $signature;

    //sends the email
    mail($to, $subject, $message, $headers);

  }

  //This function does a soft delete. Hard deletes may screw up order history. This is why soft deletes are used.
  public function destroy($id) {
    try {
      $deleteItem = Item::find($id);
      $deleteItem->active = 0;
      $deleteItem->save();
      //Destroy must return the object that was destroyed for backbone to not throw an error.
      return $deleteItem->toJson();
    } catch(Exception $e) {
      return json_encode('{"error":{"text":' . $e->getMessage() . '}}');
    }
  }
}
