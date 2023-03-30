const useNotifications = () => {
  return {
    showNotification: ({ type, message }) => {
let $ = document;

const notifications = $.querySelector(".notifications"),
buttons = $.querySelectorAll(".buttons .btn");

const toastDetails = {
	timer: 5000,
	success: {
		icon: "fa-circle-check",
		text: "Success: This is a success toast."
	},
	error: {
		icon: "fa-circle-xmark",
		text: "Error: This is an error toast."
	},
	warning: {
		icon: "fa-circle-exclamation",
		text: "Warning: This is a warning toast."
	},
	info: {
		icon: "fa-circle-info",
		text: "Info: This is an information toast."
	}
}

const removeToast = (toast) => {
	toast.classList.add("hide")
	if (toast.timeoutId) clearTimeout(toast.timeoutId); 
	setTimeout(() => toast.remove(), 500) 
}

const createToast = (id) => {
	const { icon, text } = toastDetails[id];
	const toast = $.createElement("li"); 
	toast.className = `toast ${id}` 
	toast.innerHTML = `<div class="column">
												<i class="fa-solid ${icon}"></i>
												<span>${text}</span>
										</div>
										<i class="fa-solid fa-xmark" onclick="removeToast(this.parentElement)"></i>`;
										
										notifications.innerHTML='';
	notifications.appendChild(toast);
	toast.timeoutId = setTimeout(() => removeToast(toast), toastDetails.timer)
}

buttons.forEach(btn => {
	btn.addEventListener("click", () => createToast(btn.id))
});
    }
  }
};

export default function App() {
  const { showNotification } = useNotifications();

  const handleClick = (e) => {
    const { target } = e;
    const type = target.getAttribute('data-type');

    showNotification({
      type,
      message: `${type} Notification`,
    });
  };

  return (
    <div className="content">
    <ul class="notifications"></ul>
      <h1>Add Notification</h1>
      <div className="actions buttons">
        <button className="btn" onClick={handleClick} id="info"
      >
          Info
        </button>
        <button className="btn" id="success" >
          Success
        </button>
        <button className="btn" onClick={handleClick} id="warning" >
          Warning
        </button>
        <button className="btn" onClick={handleClick} id="error"
       >
          Error
        </button>
      </div>
    </div>
  );
}