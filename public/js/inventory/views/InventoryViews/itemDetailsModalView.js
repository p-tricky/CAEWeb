//Define module for the inventory tab to live in.
InventoryApp.module('InventoryTab', function (InventoryTab, App, Backbone, Marionette, $, _) {
  //Define a composite view to be used to show the modal box that allows the user to edit an existing
  //item in the inventory. A composite view is used because the vendor dropdown needs to be a item
  //view nested inside the modal box.
  InventoryTab.ItemDetailsModalView = Backbone.Marionette.CompositeView.extend({

    //Define the tab for this view. div is default, we don't need to explicitly define it, but we are. 
    tagName : "div",

    //When this view is instanciated, run this function
    initialize : function() {
      this.template = Handlebars.compile(tpl.get('currentInventory/itemDetailsModal'));
    },

    //Define the ItemView to use with this composite view. It will be the vendor list view
    itemView: InventoryTab.ItemDetailsModalVendorListView,

    //Define the container for the itemlist view. It will be the select.
    itemViewContainer: "select",

    //Define the events to be associated with this view
    events : {
      'click .save' : 'saveItem',
      'click .delete' : 'deleteItem',
      'click .cancel' : 'cancelAction'
    },

    //Function that will be called when the view is shown. I believe that this function is something that
    //Marionette will handle on it's own. Simply provide the function, and Marionette will call it when it
    //is going to show the view.
    onShow : function() {
      //This will select the correct vendor from the list, and then disable the dropdown
      //We don't want the user to be able to change the vendor because this will mess up the
      //log for the transactions. If an item changes vendors, the old item needs to be deleted, and
      //a item with the new vendor needs to be added as a new item.
      $('option[id=' + this.model.get('vendor_id') + "]").attr('selected','selected');
      $('.select-vendor-list').prop('disabled',true);
    },

    saveItem : function() {
      //Calculating an adjustment quantity to send to the server side. This way the single increment, and
      //decrement will still work correctly. Server side will apply the adjustmentQty to the database stored qty.
      var adjustmentQuantity = (Number($('#quantity').val()) - Number(this.model.get('quantity')));
      //If the quantity is greater than or equal to 0
      if (Number($('#quantity').val()) >= 0) {
        //Create an object to send to the saveItem function of the model with the model properties to save
        var fields = {
          name:$('#name').val(),
          adjustmentQty : adjustmentQuantity,
          description : $('#description').val(),
          email_threshold : $('#emailThreshold').val(),
          item_url : $('#itemUrl').val(),
          vendor_id: $('#vendor-list').val()
        };
        //Attempt to save the item to the severside by calling the saveItem method of the model. Result will be
        //returned and stored in the result variable
        var result = this.model.saveItem(fields);
        //if the save is successful
        if (result) {
          //Remove the fade overlay and modal box
          $('#fade').removeClass('fade');
          $('#modalBox').removeClass('modalBox');
          //close the modal view
          App.tabDiv.modalArea.close();
        }
      } else {
        //The quanitity is below 0. Don't save the item.
        $('#confirmModalBox').html('Item quantity is too small. Please enter a non-negitive number.');
        $('#confirmModalBox').dialog({
          modal:true,
          title: 'Invalid Quantity',
          buttons: {
            'Ok': function() {
              $(this).dialog('close');
            }
          },
        });
      }
    },

    //Function to delete an item when the delete button is clicked
    deleteItem : function() {
      var thisModel = this.model;

      //have to set the text before calling the dialog.
      $('#confirmModalBox').html("Are you sure you want to delete this item?");
      //opens a new dialog box that double checks before deleting the item
      $('#confirmModalBox').dialog({
        modal: true,
        //sets the title
        title: "Delete Item",
        //creates two buttons, Delete Item and Cancel
        buttons: {
          //deletes the item and closes the modal box 
          "Delete Item": function() {
            //If it is to be deleted call this.model.destroy. This will delete the model and persist
            thisModel.destroy({
              wait : true,
              success : function() {
                //closes the modal box and fade class
                $('#fade').removeClass('fade');
                $('#modalBox').removeClass('modalBox');
                App.tabDiv.modalArea.close();
                $(this).dialog("close");
              }, 
              //if there is error when deleting the item, it alerts the user and logs it.
              error : function(m,e,o) {
                $('#confirmModalBox').html('Error in deleting the item. Please try again.');
                $('#confirmModalBox').dialog({
                  modal:true,
                  title: 'Item Error',
                  buttons: {
                    'Ok': function() {
                      $(this).dialog('close');
                    }
                  },            
                console.log(e);
                console.log(o);
                //closes the dialog
                $(this).dialog("close");
              }             
            });
          },
          //closes the dialog box
          Cancel: function() {
            $(this).dialog("close");
          }
        }
      });
    },

    //Function that is called when the cancel button is clicked
    cancelAction : function() {
      //Remove the fade overlay and modal box
      $('#fade').removeClass('fade');
      $('#modalBox').removeClass('modalBox');
      //Close the modal view
      App.tabDiv.modalArea.close();
    }
  });
});
