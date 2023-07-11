namespace Model {
  export class Single_Project_Template {
    static template_element = (
      document.getElementById("single-project")! as HTMLTemplateElement
    ).content.firstElementChild! as HTMLElement;
    customized_element: HTMLElement;
    project: Project;

    constructor(project: Project) {
      this.project = project;
      this.customized_element =
        Single_Project_Template.template_element.cloneNode(true) as HTMLElement;
      this.customized_element.textContent =
        "タイトル :" +
        project.title +
        "\n" +
        "説明 : " +
        project.description +
        "\n" +
        "人月 : " +
        project.manday;
      this.customized_element.setAttribute("draggable", "true");
      this.customized_element.addEventListener("DOMContentLoaded", () => {
        // Get the element by id
        const element = document.getElementById("#in-work")!;
        // Add the ondragstart event listener
        element.addEventListener("dragstart", this.drag_start);
      });
      this.customized_element.addEventListener("dragstart", this.drag_start);
    }

    @Autobind
    private drag_start(event: DragEvent) {
      event.dataTransfer!.dropEffect = "move";
      event.dataTransfer!.items.add(this.project.title!, "text/plain");
      event.dataTransfer!.setData("text/plain", this.project.title!);
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
