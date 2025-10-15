export function showError(input, message) {
  const p = document.querySelector(`.error[data-for="${input.id}"]`);
  if (p) p.textContent = message || "";
}

export function validateForm(form) {
  let ok = true;
  const name = form.querySelector("#name");
  const email = form.querySelector("#email");
  const subject = form.querySelector("#subject");
  const message = form.querySelector("#message");
  if (!name.checkValidity()) { showError(name, "Please enter your name."); ok = false; } else showError(name, "");
  if (!email.checkValidity()) { showError(email, "Enter a valid email."); ok = false; } else showError(email, "");
  if (!subject.checkValidity()) { showError(subject, "Enter a subject."); ok = false; } else showError(subject, "");
  if (!message.checkValidity()) { showError(message, "Enter a message (min 10 characters)."); ok = false; } else showError(message, "");
  return ok;
}

export function initContact() {
  const form = document.querySelector("#contact-form");
  const status = document.querySelector("#form-status");
  if (!form || !status) return;
  form.addEventListener("submit", e => {
    e.preventDefault();
    if (!validateForm(form)) return;
    const data = new FormData(form);
    const payload = Object.fromEntries(data.entries());
    localStorage.setItem("dm-last-contact", JSON.stringify(payload));
    status.textContent = "Message sent! We will contact you soon.";
    form.reset();
  });
}
