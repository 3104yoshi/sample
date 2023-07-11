# TypeScriptSample
### TypeScript の install
- node.js を公式サイトからインストール https://nodejs.org/en/
- npm でインストールするときは、-g オプションでパスを通すことができる npm help install で各種オプションを確認できる

### npm init
- npm initで様々な依存関係を追加するのに必要なpackage.json を追加できる
- npm init はファイル名に日本語が含まれてるとエラーが出る

### npm install を用いてツールを導入する方法
- npm install ツール名 で導入する
- よく使うオプション
  - --save-dev は開発中にのみ必要なものをインストールするときのオプション。本オプションをつけてインストールしたモジュールは実際のプロダクトには含まれない
- package.json の devDependencies にinstall したツール が追加される
- package.json の scripts に導入したツールとコマンドを設定できる
  - 例) "start": ツール名 を追加すると、npm start でツールを呼び出せる

### npm install で開発用サーバーを導入する方法
- lite-server
  - 開発用のWebServer。フォルダ内のファイルが変更されると自動的にページがリロードされる (.ts を変更しただけではリロードされない。コンパイルの必要あり)
  - npm install --save-dev lite-server で開発用サーバーを導入できる
  - package.json の devDependencies にlite-server が追加される
  - package.json の scripts に開発に使用するツールを設定する

### コンパイル
- npx tsc app.ts でコンパイルできる
- npx tsc app.ts --watch でウォッチモードにできる。.tsファイルが変更された時点で自動でコンパイルされる。 (--w でも可)
  - ↑だと、app.tsしか監視されない
- ルートディレクトリで npx tsc --init を実行すると、ルート以下のサブディレクトリも含めて1つのプロジェクトとみなされる。 (tsconfig.json が生成される)
  - その上で npx tsc とすると、すべての.ts ファイルがコンパイルされる
  - また、npx tsc --watch とすることで、ウォッチモードを使うこともできる
#### tsconfigの設定
- "exclude": [] に .tsファイルを定義するとコンパイルが行われなくなる
- "include": [] に指定すると、ここに定義した .ts ファイルだけがコンパイルされる
- include と exclude の両方を定義すると、include の中から esclude で定義したファイルが除外される
###### compilerOptions
- target 
  - javascript のバージョンを指定できる
- Lib
  - javascript に必要なライブラリを設定できる
  - デフォルトでは target で指定したバージョンに合わせたライブラリが設定される
- allowjs, checkjs
- jsx
  - React を使う際に必要なオプション
- declaration
  - ライブラリとして使用したい場合に指定する
- SourceMap
  - true にすると、.js.map が生成される
  - typescript と javascript のコードを対応付けしたファイル
- outdir
  - .ts コンパイル時の.js の出力先を設定できる
  - 慣習的に　/src に .ts を配置し、 /dist に .js を配置することが多い (dist は distributable の略)
  - 入力元のフォルダ構成はそのままにコンパイルされる
- rootdir
  - .ts の配置元
  - ここで指定したフォルダの外に .ts ファイルが存在するとコンパイルエラーとなる
- removeComment
  - コンパイル時にコメントを削除する
- noOmitOnError
  - true に設定すると、コンパイルエラーがあるときに .js が出力されなくなる
- strict
  - 型チェックをどれだけ厳密に行うかを設定する
  - strict : true にするとその下にある設定がすべて true と見なされる。
  - その下にある設定を個別に設定することもできる

### enumについて
- 安全上の問題がある (以下、誤った使い方をしているが、コンパイルエラーが出ないパターン)
1. 10 は初めに定義していないが代入できる
```typescript
enum BookEnum {
    comic = 0,
    magazine,
    paperback,
}

const book : BookEnum =  10;
```

2. 存在しないインデックスにアクセスできる
```typescript
enum BookEnum {
    comic = 0,
    magazine,
    paperback,
}

console.log(BookEnum[5]); // // undefined
```

- 解決策
1. Union 型を使う。※Enumでは数値が割り当てられていたが、この場合は割り当てられない
```typescript
type BookEnum = "comic" | "magazine" | "paperback";
const book : BookEnum = "textbook"; // コンパイルエラー
```

2. オブジェクトリテラルを使う。※各列挙子に対してユニークな数値が割り当てられる
```typescript
const BookEnum = {
  comic: 0,
  magazine: 1,
  paperback: 2,
};

// keyof はオブジェクト型からプロパティ名を型として返す演算子
// オブジェクト型のvalue を取り出すときは、object[key] で取り出せる
type BookEnum = typeof BookEnum[keyof typeof BookEnum]; 

console.log(BookEnum.comic)
```

### Debug
- JavaScriptDebugger を使用する。 (Chrome for Debugger は 2021年に非推奨になった)
- ブレークポイントを貼ってデバッグを開始すると、初回のみ選択肢が現れるので、表示したいブラウザを選択する
- 初回のみurl のポートを3000にする必要がある
- 変更後、コンパイルする。

### Tips
- vscode で html と入力すると候補が表示される。html5を選択するとテンプレt－とが表示される
- script タグのdefer 属性でhtmlを解析してからjavascriptを読み込むように設定できる
