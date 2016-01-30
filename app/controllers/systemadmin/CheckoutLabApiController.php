<?php
class CheckoutLabApiController extends BaseController {

  //function to get the list of checkouts
  public function index() {
  	try {
      $sort = Input::get('sort');
      switch ($sort) {
        case 'dateDesc':
          $checkouts = LabCheckouts::orderBy('checkout_date', 'DESC')->get();
          break;
        case 'dateAsc':
          $checkouts = LabCheckouts::orderBy('checkout_date')->get();
          break;
        case 'nameDesc':
          $checkouts = LabCheckouts::orderBy('name', 'DESC')->get();
          break;
        case 'nameAsc':
          $checkouts = LabCheckouts::orderBy('name')->get();
          break;
        case 'labDesc':
          $checkouts = LabCheckouts::orderBy('lab', 'DESC')->get();
          break;
        case 'labAsc':
          $checkouts = LabCheckouts::orderBy('lab')->get();
          break;
      }
  		return $checkouts->toJSON();
  	} catch(Exception $e) {
      return json_encode('{"error":{"text":' . $e->getMessage() . '}}');
    }
  }

  //called when adding a new lab checkouts
  public function store() {
  	try {
      //get the input that is passed in from Backbone
      $addModel = Input::json()->all();

      //creates a new labCheckout
      $addCheckout = new LabCheckouts;
      $addCheckout->lab = $addModel['lab'];
      $addCheckout->phone_number = $addModel['phone_number'];
      $addCheckout->checkout_date = $addModel['checkout_date'];
      //sets the name and email to what was received from LDAP
      $addCheckout->name = $addModel['name'];
      $addCheckout->email = $addModel['email'];

      //saves the checkout, then returns it to Backbone
      $addCheckout->save();
      return $addCheckout->toJSON();
  	} catch(Exception $e) {
      return json_encode('{"error":{"text":' . $e->getMessage() . '}}');
    }
  }

  //called when editting a lab checkout
  public function update($id) {
  	try {
      //gets the input from Backbone
      $updateModel = Input::json()->all();

      //find the checkout that needs to be edited and sets the properties.
      $updateCheckout = LabCheckouts::find($id);
      $updateCheckout->lab = $updateModel['lab'];
      $updateCheckout->phone_number = $updateModel['phone_number'];
      $updateCheckout->checkout_date = $updateModel['checkout_date'];
      $updateCheckout->name = $updateModel['name'];
      $updateCheckout->email = $updateModel['email'];

      //save the updated checkout and returns it to Backbone
      $updateCheckout->save();
      return $updateCheckout->toJSON();
  	} catch(Exception $e) {
      return json_encode('{"error":{"text":' . $e->getMessage() . '}}');
    }
  }

  //called when deleting a checkout
  public function destroy($id) {
  	try {
      //find the checkout to delete
      $destroyCheckout = LabCheckouts::find($id);
      //delete the checkout and return it to Backbone
      $destroyCheckout->delete();
      return $destroyCheckout->toJSON();
  	} catch(Exception $e) {
      return json_encode('{"error":{"text":' . $e->getMessage() . '}}');
    }
  }
}
