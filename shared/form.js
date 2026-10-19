/* Fake-door form: records intent (preorder | waitlist) + email.
 * Set FORM_ENDPOINT to a Formspree / Tally / Basin endpoint before publishing.
 * Nothing is charged; the dialog says so. */
(function () {
  var FORM_ENDPOINT = window.FORM_ENDPOINT || "";
  var PRODUCT = document.body.dataset.product || "unknown";
  var dlg = document.getElementById("door");
  var form = dlg.querySelector("form");
  var intentField = form.querySelector('input[name="intent"]');
  var title = dlg.querySelector("h3");
  var note = dlg.querySelector("p");
  var status = dlg.querySelector(".status");

  function open(intent) {
    intentField.value = intent;
    if (intent === "preorder") {
      title.textContent = "Pre-orders aren't open yet";
      note.textContent = "Leave your email and you'll get the launch price shown on this page, locked in. No charge today.";
    } else {
      title.textContent = "Get one email when it ships";
      note.textContent = "No newsletter, no drip sequence. One message on launch day.";
    }
    status.textContent = "";
    form.hidden = false;
    try { localStorage.setItem("intent", intent); } catch (e) {}
    dlg.showModal();
  }

  document.querySelectorAll("[data-intent]").forEach(function (b) {
    b.addEventListener("click", function () { open(b.dataset.intent); });
  });
  dlg.querySelector(".close").addEventListener("click", function () { dlg.close(); });

  form.addEventListener("submit", function (ev) {
    ev.preventDefault();
    var data = new FormData(form);
    data.set("product", PRODUCT);
    data.set("page", location.pathname);
    data.set("ref", document.referrer || "");
    if (!FORM_ENDPOINT) {
      status.className = "status err";
      status.textContent = "Form endpoint not configured yet.";
      return;
    }
    status.className = "status";
    status.textContent = "Saving…";
    fetch(FORM_ENDPOINT, { method: "POST", body: data, headers: { Accept: "application/json" } })
      .then(function (r) { if (!r.ok) throw new Error(r.status); })
      .then(function () {
        form.hidden = true;
        status.className = "status done";
        status.textContent = intentField.value === "preorder"
          ? "You're in. Launch price is locked for this email."
          : "Done. One email on launch day.";
      })
      .catch(function () {
        status.className = "status err";
        status.textContent = "Couldn't save that. Try again in a moment.";
      });
  });
})();
