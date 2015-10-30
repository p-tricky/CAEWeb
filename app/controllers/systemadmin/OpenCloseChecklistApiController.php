<?php
class OpenCloseChecklistApiController extends BaseController {

  public function index() {
    try {
      return OpenCloseChecklist::all();
    } catch(Exception $e) {
      return json_encode('{"error":{"text":' . $e->getMessage() . '}}');
    }
  }

  public function store() {
    $newModel = new OpenCloseChecklist;
    $newModel['task_date'] = Input::get('task_date');
    $newModel->save();
    return $newModel->toJSON();
  }

  public function update($id) {
    //gets the input from Backbone
    $updateModel = Input::json()->all();

    //find the checkout that needs to be edited and sets the properties.
    $updateChecklist = OpenCloseChecklist::find($id);
    $updateChecklist->task_date = $updateModel['task_date'];

    $updateChecklist->cico_system_on = $updateModel['cico_system_on'];
    $updateChecklist->printers_on = $updateModel['printers_on'];
    $updateChecklist->print_stations_on = $updateModel['print_stations_on'];
    $updateChecklist->open_main_doors = $updateModel['open_main_doors'];
    $updateChecklist->open_side_doors = $updateModel['open_side_doors'];
    $updateChecklist->opened_by = $updateModel['opened_by'];

    $updateChecklist->cico_system_off = $updateModel['cico_system_off'];
    $updateChecklist->printers_off = $updateModel['printers_off'];
    $updateChecklist->print_stations_off = $updateModel['print_stations_off'];
    $updateChecklist->close_main_doors = $updateModel['close_main_doors'];
    $updateChecklist->close_side_doors = $updateModel['close_side_doors'];
    $updateChecklist->refill_printer_paper = $updateModel['refill_printer_paper'];
    $updateChecklist->push_in_chairs = $updateModel['push_in_chairs'];
    $updateChecklist->turn_off_machines = $updateModel['turn_off_machines'];
    $updateChecklist->recycle_prints = $updateModel['recycle_prints'];
    $updateChecklist->lock_cae_office_doors = $updateModel['lock_cae_office_doors'];
    $updateChecklist->closed_by = $updateModel['closed_by'];

    //save the updated checkout and returns it to Backbone
    $updateChecklist->save();
    return $updateChecklist->toJSON();
  }

  //called when deleting a openclosetasklist
  public function destroy($id) {
    //find the checkout to delete
    $destroyChecklist = OpenCloseChecklist::find($id);
    //delete the checkout and return it to Backbone
    $destroyChecklist->delete();
    return $destroyChecklist->toJSON();
  }
}
