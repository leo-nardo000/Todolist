import { id } from "./helper";

const tasks = document.getElementById("tasks");
const alerts = document.getElementById("alerts");

export default class UI {
	createTask({ task, date, taskcolor, id }) {
		const array_date = date.split("-");
		const final_date = new Date(
			array_date[0],
			array_date[1] - 1,
			array_date[2]
		);
		const now = new Date(Date.now());

		const ms = final_date - now;
		const days = Math.floor(ms / 86400000);
		const hours = Math.floor((ms % 86400000) / 3600000);
		const minutes = Math.round(((ms % 86400000) % 3600000) / 60000);
		const seconds = Math.round((((ms % 86400000) % 3600000) % 60000) / 1000);

		return `
            <div class='task' style="background-color:${taskcolor}">
                <input type="checkbox" class="task__checkbox"/>
                <h3 class="task__title">${task}</h3>
                <div class="task__date">
                    <div>${days}</div>
                    <div>${hours}</div>
                    <div>${minutes}</div>
                    <div>${seconds}</div>
                    <div>D</div>
                    <div>H</div>
                    <div>M</div>
                    <div>S</div>
                </div>
                <p class="task__delete" data-delete=${id}>X</p>
            </div>
        `.trim();
	}

	storeTask(task) {
		const id_task = id();
		const task_id = JSON.parse(localStorage.getItem(id));
		if (task_id !== null) {
			this.storeTask(task);
		}
		task.id = id_task;
		localStorage.setItem(task.id, JSON.stringify(task));
	}

	getTasks() {
		const keys = Object.keys(localStorage).filter((id) => {
			if (id !== "loglevel:webpack-dev-server") {
				return id;
			}
		});
		return keys.map((key) => JSON.parse(localStorage.getItem(key)));
	}

	renderTask() {
		const tasks_elements = this.getTasks()
			.map((task) => this.createTask(task))
			.join("");
		tasks.innerHTML = tasks_elements;
	}

	deleteTask(element) {
		if (element.dataset.delete) {
			element.parentElement.remove();
		}
	}

	alert(message, status) {
		const fragment = document.createDocumentFragment();
		const p = document.createElement("p");
		p.style.backgroundColor = status;
		p.classList.add("alert");
		p.textContent = message;
		fragment.append(p);

		alerts.prepend(fragment);
		setTimeout(() => {
			p.remove();
		}, 3000);
	}
}
