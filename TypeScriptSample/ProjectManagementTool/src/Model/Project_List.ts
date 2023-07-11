namespace Model {
  export class Project_List {
    host_element: HTMLDivElement;
    customized_element: HTMLElement;
    ul_element: HTMLElement;

    constructor(
      host_element: HTMLDivElement,
      projects_header: string,
      projects_id: string
    ) {
      this.host_element = host_element;
      const template_element = document.getElementById(
        "project-list"
      )! as HTMLTemplateElement;
      this.customized_element =
        template_element.content.firstElementChild!.cloneNode(
          true
        ) as HTMLElement;
      this.ul_element = this.customized_element.querySelector(
        "ul"
      )! as HTMLElement;
      this.customized_element.id = projects_id;
      this.customized_element.querySelector("h2")?.append(projects_header);
      this.ul_element.ondrop = this.drop_handler;
      this.ul_element.ondragover = this.dragover_handler;
    }

    public add_project(project_element: HTMLElement) {
      this.ul_element.insertAdjacentElement("beforeend", project_element);
    }

    private dragover_handler(event: Event) {
      event.preventDefault();
    }

    @Autobind
    private drop_handler(event: DragEvent) {
      event.preventDefault();
      const title = event.dataTransfer?.getData("text/plain");
      const moved_project = new Project(title!, "done!", "done!");
      const moved_project_element = new Single_Project_Template(moved_project);
      this.ul_element.insertAdjacentElement(
        "beforeend",
        moved_project_element.customized_element
      );
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
