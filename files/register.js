import { courses } from "../data.js";
const formWrapper = document.querySelector(".form-wrapper");

const getCourseString = window.location.href.slice(
  window.location.href.indexOf("?") + 1,
  window.location.href.length
);

const getCourse = courses.filter((c, i) => {
  if (c.courseID === getCourseString) {
    return c;
  }
})[0];

const register = async function (e) {
  try {
    e.preventDefault();
    const formData = new FormData(this);
    const regisObj = {
      user: formData.get("username"),
      email: formData.get("email"),
      phNumber: formData.get("phoneNumber"),
      course: getCourse.courseName,
    };
    const res = await fetch(`https://retoolapi.dev/kkU3f0/Registrations`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(regisObj),
    });
    const data = await res.json();
    formWrapper.innerHTML = `
  <h1 class="submit-msg">Yaya, you have successfully registered</h1> 
  `;
  } catch (error) {
    console.log(error);
  }
};

const renderRegistrationForm = function () {
  const markup = `
    <div class="div-card">
      <div class="div-poster">
        <img src="${getCourse.coursePoster}" alt="" />
      </div>
      <form class="div-form-register">
        <div class="div-formElement">
          <div class="label-wrapper">
            <label class="course-name">Course: <span class="course-title"> ${getCourse.courseName}</span></label>
          </div>
        </div>
        <div class="div-inputs">
          <div class="div-formElement">
            <div class="label-wrapper">
              <label class="label">Enter your name</label>
            </div>
            <div class="input-wrapper">
              <input required type="text" class="input" name="username" />
            </div>
          </div>

          <div class="div-formElement">
            <div class="label-wrapper">
              <label class="label">Enter your email</label>
            </div>
            <div class="input-wrapper">
              <input required type="email" class="input" name="email" />
            </div>
          </div>
          <div class="div-formElement">
            <div class="label-wrapper">
              <label class="label">Enter your phone number</label>
            </div>
            <div class="input-wrapper">
              <input required type="number" maxlength="10" class="input" name="phoneNumber" />
            </div>
          </div>
          <div class="div-formElement">
            <div class="input-wrapper">
              <button class="btn-register" type="submit">Register</button>
            </div>
          </div>
        </div>
      </form>
    </div>
    `;
  formWrapper.insertAdjacentHTML("afterbegin", markup);
  const form = document.querySelector(".div-form-register");
  form.addEventListener("submit", register);
};

if (getCourse) {
  renderRegistrationForm();
} else {
  formWrapper.innerHTML = "ERROR";
}
