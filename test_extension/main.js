define(["base/js/namespace", "base/js/events"], function (Jupyter, events) {
  var init_nb = function () {
    Jupyter.notebook.insert_cell_above("code").set_text(`test = "OK"`);
    Jupyter.notebook.select_prev();
    setTimeout(function () {
      Jupyter.notebook.execute_cell();
      Jupyter.notebook.delete_cell();
    }, 2000);
    console.log("INIT");
  };

  var save_content = function () {
    while (Jupyter.notebook.kernel === null) {
      console.log("Kernel not init");
    }
    console.log("Kernel init :)");
    console.log(Jupyter.notebook.kernel);
    //         Jupyter.notebook.
    //         insert_cell_above('code').
    //         set_text(`import datetime
    // test = "HAHA"
    // d = datetime.datetime.today().strftime("%Y/%m/%d %X")
    // with open("test.txt", "a") as f:
    //     f.write(test + " " + d + "\\n")
    //         `);
    //         Jupyter.notebook.select_prev();
    //         Jupyter.notebook.execute_cell();
    //         Jupyter.notebook.delete_cell();
    Jupyter.notebook.kernel.execute(`import threading
import time
import datetime

def thread_function():
    while True:
        time.sleep(5)
        d = datetime.datetime.today().strftime("%Y/%m/%d %X")
        with open("test.txt", "a") as f:
            f.write(test + " " + d + "\\n")
            
x = threading.Thread(target=thread_function)
x.start()
        `);
    console.log("SAVE CONTENT");
  };

  // Add Toolbar button
  var planetJupyterButton = function () {
    console.log("run");
    Jupyter.toolbar.add_buttons_group([
      Jupyter.keyboard_manager.actions.register(
        {
          help: "Add planet jupyter cell",
          icon: "fa-paper-plane",
          handler: save_content,
        },
        "addplanetjupyter-cell",
        "Planet Jupyter"
      ),
    ]);
  };

  var save_auto = function () {
    setInterval(function () {
      console.log("Save content 2 !!");
      save_content();
    }, 5000);
  };

  // Run on start
  function load_ipython_extension() {
    // Add a default cell if there are no cells
    if (Jupyter.notebook.get_cells().length === 1) {
      init_nb();
    }
    save_content();
    // planetJupyterButton();
    // save_auto();
  }
  return {
    load_ipython_extension: load_ipython_extension,
  };
});
