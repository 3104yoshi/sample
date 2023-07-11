namespace Model {
  export class Project {
    title: string;
    description: string;
    manday: string;

    constructor(title: string, description: string, manday: string) {
      if (Number.isNaN(manday) || +manday <= 0) {
        alert("人日は0以上の数値で入力してください");
        throw new TypeError("人日は0以上の数値で入力してください");
      }
      this.title = title;
      this.description = description;
      this.manday = manday;
    }
  }
}
