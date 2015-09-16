<?php
 
use Illuminate\Database\Eloquent\Collection as BaseCollection;

class UploadScheduleController extends BaseController {
  public function fillInSchedule() {

    // info is stored in the $_FILES array
    // upload a small file and view the uploadschedule response to see the
    // contents of $_FILES and the file
    echo '$_Files: ' . print_r($_FILES, true);

    $uploadName = $_FILES['file']['tmp_name'];
    $upload = fopen($uploadName, 'r');
    echo fread($upload, filesize($uploadName));
    fclose($upload);
  }
}
