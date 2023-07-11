namespace Model {
  export class Project_Form_Element {
    host_element: HTMLDivElement;
    template_element: HTMLTemplateElement;
    customized_element: HTMLFormElement;
    project_List: Project_List;
    pro_list: HTMLElement[];

    constructor(host_element: HTMLDivElement, project_List: Project_List) {
      this.host_element = host_element;
      this.template_element = document.getElementById(
        "project-input"
      )! as HTMLTemplateElement;
      this.customized_element = this.template_element.content
        .firstElementChild! as HTMLFormElement;
      this.customized_element.id = "user-input";
      this.pro_list = [];
      this.project_List = project_List;

      this.customized_element.addEventListener("submit", this.submit_project);
    }

    @Autobind
    private submit_project(event: Event) {
      // イベントのデフォルトの操作 (submit のデフォルトはフォームの内容を指定したURLへ送信する、というもの) をキャンセル
      event.preventDefault();
      const project = new Project(
        (
          this.customized_element.querySelector("#title")! as HTMLInputElement
        ).value,
        (
          this.customized_element.querySelector(
            "#description"
          )! as HTMLInputElement
        ).value,
        (
          this.customized_element.querySelector("#manday")! as HTMLInputElement
        ).value
      );
      const child = new Single_Project_Template(project).customized_element;
      this.pro_list.push(child);
      this.project_List.add_project(child);
    }
  }

  function Autobind(_: any, _2: string, descriptor: PropertyDescriptor) {
    const originalMethod = descriptor.value;
    const adjDescriptor: PropertyDescriptor = {
      configurable: true,
      enumerable: false,
      get() {
        const boundFn = originalMethod.bind(this);
        return boundFn;
      },
    };
    return adjDescriptor;
  }
}
