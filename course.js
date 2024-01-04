import { courses } from "./data.js";

const coursesDiv = document.querySelector(".div-courses");
coursesDiv.innerHTML = "";

courses.forEach((course, i) => {
  const contentMarkup = course.courseContent
    .map((cc, i) => `<li>${cc}</li>`)
    .toString()
    .replaceAll(",", "");
  const markup = `
    <div class="course">
    <div class="div-course-content">
      <div class="div-content-wrapper">
        <div class="div-course-title">
        <p class="course-title">${course.courseName}</p>
        <img class="course-img" src="${course.coursePoster}" />
        </div>
        <div class="dev-description">
          <ul>
            ${contentMarkup}
          </ul>
        </div>
      </div>
      <div class="div-reg-btn">
        <a href="files/register.html?${course.courseID}" class="btn-register" id="${course.courseID}">Register</a>
      </div>
    </div>
  </div>
    `;
  coursesDiv.insertAdjacentHTML("beforeend", markup);
});
