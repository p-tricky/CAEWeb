<?php
class AVLogApiController extends BaseController {

  //called to get all log messages for a specified room
  public function index() {
    $logs = AVLog::where('room_name', '=', Input::get('room'))->get();
    foreach ($logs as $log) {
      $log->username = User::where('id', '=', $log->uid)->pluck('fullname');
    }
    return $logs->toJson();
  }

  //this is the save method for new log messages
  public function store() {
    try {
      //creates the new AVLog, sets the properties and saves it
      $addModel = Input::json()->all();

      $addLogEntry = new AVLog;
      $user = Auth::user();

      $addLogEntry->room_name = $addModel['room_name'];
      $addLogEntry->message = $addModel['message'];
      $addLogEntry->uid = $user->id;

      $addLogEntry->save();

      return $addLogEntry->toJson();
    } catch(Exception $e) {
      return json_encode('{"error":{"text":' . $e->getMessage() . '}}');
    }
  }
  //Will be called when a new event is logged.
  public function sendEmail() {
    //get all items that are low
    $log = AVLog::orderBy('created_at', 'desc')->first();

    $to = implode(', ', DB::table('users')->where('positions_id', '=', 6)->lists('email'));

    //will run the inventoryEmail script. Emails the low quantities
    $subject = $log->room_name . " update";

    // Additional headers
    $from = 'From: Classroom Monitor';
    $cc = 'CC: ' . User::where('id', '=', $log->uid)->pluck('email');
    $headers = $from . "\r\n" . $cc;

    //Lines longer than 70 characters will wrap, as per suggestion in php.net documentation
    $message = wordwrap($log->message, 70); 
    $fromUser = "\r\nCreated by: " . User::where('id', '=', $log->uid)->pluck('fullname');
    $signature = "\r\n\r\nCAE Center";
    $message .= $fromUser . $signature;

    //sends the email. The server will handle everything after this. 
    mail($to, $subject, $message, $headers);
  }

  //used by Recent Event tab. Will get the 15 newest events and return them
  public function recent() {
    $logs = AVLog::orderBy('updated_at', 'DESC')->take(15)->get();
    foreach ($logs as $log) {
      $log->username = User::where('id', '=', $log->uid)->pluck('fullname');
    }
    return $logs->toJson();
  }

  public function update($id) {
    //stub for updates. Should not be needed.
  }

  public function destroy($id) {
    //stub for deletes. Should not be needed.
  }
}
