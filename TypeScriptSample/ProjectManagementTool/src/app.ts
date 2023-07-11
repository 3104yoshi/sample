/// <reference path="./Model/Project_Form_Template.ts" />
/// <reference path="./Model/Project_List.ts" />
const host_element = document.getElementById("app")! as HTMLDivElement;
const working_projects = new Model.Project_List(host_element, "実行中のプロジェクト", "in-work");
attach(working_projects.host_element, working_projects.customized_element, "beforeend");

const project_form_template = new Model.Project_Form_Element(host_element, working_projects);
attach(project_form_template.host_element, project_form_template.customized_element, "afterbegin");

const done_projects = new Model.Project_List(host_element, "完了したプロジェクト", "finished-projects");
attach(done_projects.host_element, done_projects.customized_element, "beforeend");

function attach(host_element : HTMLElement, child_element : HTMLElement, insertPosition : InsertPosition) {
    host_element.insertAdjacentElement(
        insertPosition,
        child_element
    );
}

