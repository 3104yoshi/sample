### var と let の違い
- スコープが違う
- var はグローバル変数となり、let はブロック変数となる

### デフォルト関数
- デフォルト値のあるパラメータは右側にあるパラメータにしか設定できない。(1番目の引数にデフォルトを設定し、2番目の引数に設定しない場合、呼び出すときに省略できないため)

### スプレッド演算子 (...)
- 配列の値を展開できる
- array.push(...array2);　で一括で追加できる

### リスト内のオブジェクトをコピー

``` javascript
const array = { ...originalArray }
```
### レストパラメータ
- 任意の数の引数を受け取れる

### 分割代入
- 配列の分割代入
- オブジェクトの分割代入

### interface
- JavaScript には存在しないため、コンパイル後のコードには定義されない

### 型キャスト
- as HTMLInputElement のようにするとキャストできる
- 先頭に <HTMLInputElement> としてもよいが、React を使う場合に衝突する可能性があるので非推奨

### インデックス型
- 
  
### オプショナルチェーン
- プロパティが存在している場合のみ、そのプロパティにアクセスできる

### デコレータ
  - tsconfif の experimentaldecolator を true にする
  - クラスに対して @Function名 というアノテーションをつけることでデコレータをクラスに紐づけることができる
  - デコレータはクラスが定義されたときに実行される
  
  - デコレータファクトリを使用するとデコレータをカスタマイズできる
  - 以下のようにすると、html の app に対してDOM を生成することができる

```
function WithTemplate(template: string, hookId: string) {
    return function(_: Function) {
      const hookEl = document.getElementById(hookId);
      if (hookEl) {
        hookEl.innerHTML = template;
      }
    };
  }
  
// @Logger('ログ出力中 - PERSON')
@WithTemplate('<h1>Personオブジェクト</h1>', 'app')
class Person {
    name = 'Max';

    constructor() {
        console.log('Personオブジェクトを作成中...');
    }
}
```

  - 余談として、Angular もデコレータをベースに作られている
  - デコレータの実行順序 デコレータ関数の作成は上から、関数の実行は下から行われる 109参照

### プロパティデコレータ
  - 110参照
  
### getElementById
  - 何らかのHTMLElement を返すことしかわからないため、直接HTMLTemplateElement に格納しようとするとエラーがでる

### eventHandler の this について
  - イベントの対象となったオブジェクトを this に bind する
  - https://developer.mozilla.org/ja/docs/Web/API/EventTarget/addEventListener#%E3%81%9D%E3%81%AE%E4%BB%96%E3%81%AE%E6%B3%A8%E6%84%8F%E4%BA%8B%E9%A0%85
  
### ファイルの分割方法
  - htmlで分割した数だけ.jsファイルを読み込む
    - 非推奨
      - インポートするファイルがどんどん増えていく
      - コーディング中にtypescript の型チェックを使用できなくなる
      - インポート順を間違えると動かなくなる
  - namespaceを使用する
    - namespace を<reference path="" />を用いてインポートする
    - この場合、コンパイル後の js では reference タグが存在しないので設定を変更する必要あり
      - tsconfig の outfile にファイルを設定する (コンパイル後、ここで指定したファイルに出力される)
      - module のオプション "AND" に変更する

### 非同期API
  - setTimeout
  - Promise
  - queueMicrotask ...etc

  ### promise
  - 