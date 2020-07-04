import "./sass/normalize.css";
import "./sass/main.scss";

import UI from "./UI";

const ui = new UI();

const taskState = {
	task: "",
	date: "",
	taskcolor: "",
};

const form = document.getElementById("form");
const colors = document.querySelectorAll(".task__color");

colors.forEach((color) => {
	color.addEventListener("click", (e) => {
		colors.forEach((color) => color.classList.remove("active"));
		taskState.taskcolor = e.target.dataset.color;
		e.target.classList.add("active");
	});
});

form &&
	form.addEventListener("submit", (e) => {
		e.preventDefault();

		taskState.task = document.getElementById("task").value;
        taskState.date = document.getElementById("date").value;
        
        // validaciones
        if(taskState.task == '' || taskState.date == ''){
            ui.alert('Los campos no pueden estar vacios','red');
            return;
        }

        if(taskState.taskcolor == ''){
            ui.alert('Debes elegir un color para la tarea','red')
            return;
        }

        // fecha 
        const array_date = taskState.date.split("-");
		const final_date = new Date(
			array_date[0],
			array_date[1] - 1,
			array_date[2]
        );
        const now = new Date(Date.now());
        
        if (final_date < now) {
            ui.alert('La fecha ingresada no puede ser inferior a la fecha actual','red');
            return;
        }
        // creacion de la tarea
        ui.alert('Tarea agregada satisfactoriamente','green');
		ui.storeTask(taskState);
		ui.renderTask();
		form.reset();
	});

document.getElementById("tasks").addEventListener("click", (e) => {
    ui.deleteTask(e.target);
    localStorage.removeItem(e.target.dataset.delete);
    console.log(e.target.dataset.delete);
});

setInterval(() => {
    ui.renderTask();
}, 1000);

console.log('hola');


