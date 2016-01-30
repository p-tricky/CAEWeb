<?php

class Shift extends Eloquent {

  /**
   * The database table used by the model.
   *
   * @var string
   */
  protected $table = 'shifts';

  public function user() {
    return $this->belongsTo('User', 'eid');
  }

  public static function sendNotificationEmail($forgottenShifts) {
    $forgottenShifts->load('user');

    $subject = "Employees Forgot to Clock Out";
    $headers = 'From: Shift Manager ' . "\r\n"; 
    $message = "-Automated message from Shift Manager System-\r\nThe following employee shifts were automatically clocked out:\r\n\r\n\r\n";
    $to = implode(', ', DB::table('users')->where('positions_id', '=', 6)->lists('email'));

    // add super users
    $sUsers = User::where('acc_super_user', '=', 1)
      ->where('acc_notifications', '=', 1)
      ->select('email')
      ->get();
    foreach ($sUsers as $sUser) $to .= $sUser['email'] . ", ";

    // add forgotten shifts to the message body and 
    // add the employee to the email addresses if he is set to receive
    // notifications
    foreach($forgottenShifts as $shift) {
      $overclockedUser = $shift->user;
      $line = sprintf("%-40s %s   %s\r\n", $overclockedUser->fullname, $shift['clockIn'], $shift['clockOut']);
      $message .= $line;
      if ($overclockedUser['acc_notifications'] == "1") 
        $to .= $overclockedUser->email . ", ";
    }
    //removes the last comma and space from $to
    if (strlen($to) > 1) $to = substr($to, 0, strlen($to)-2);
    $message .= "\r\nThe shift manager site can be reached at: https://loftythoughts.me/caeweb/employee/shiftmanager/ \r\n"; 
    $signature = "\r\n\r\nCAE Center\r\nCollege of Engineering and Applied Sciences";
    $message .= $signature;
    mail($to, $subject, $message, $headers);
  }
}
