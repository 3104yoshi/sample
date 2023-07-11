# Validation
- バリデーション方法は大きく3つある。
1. アノテーションとValidator を組み合わせる方法
2. ValidationRule を実装する方法
3. INotifyDataErrorInfo を実装する方法がある

- アノテーションと Validator を組み合わせる方法だとソースコードが簡潔になる。かつ、アノテーションを使用することでプロパティの値を制限できる
- ValidationRule を使用すると ViewModel からバリデーションのロジックを分離できる
- INotifyDataErrorInfoを使用すると、ErrorsChangedイベントを使って任意のタイミングで入力値検証の更新ができるほか、ひとつのプロパティに対して、複数のエラーを保持できる

- 参考 https://learn.microsoft.com/en-us/archive/msdn-magazine/2010/june/msdn-magazine-input-validation-enforcing-complex-business-data-rules-with-wpf

## プロパティのバリデーション方法
### アノテーションとValidator を組み合わせる方法
- System.ComponentModel.DataAnnotations 以下のアノテーションを設定することでプロパティに制約を付加できる
- ex)以下は、10文字までかつ、半角数字のみ、という制約を付けた例
``` C#
        [MaxLength(10, ErrorMessage = "10文字までしか入力できません")]
        [RegularExpression(@"^[0-9]+$", ErrorMessage ="半角数字以外は入力できません")]
        public string Text
        {
            get { return _text; }
            set { ValidateProperty(value, nameof(this.Text));
                SetProperty(ref _text, value); }
        }
        
        private void ValidateProperty<T>(T value, string propertyName)
        {
            Validator.ValidateProperty(value, new ValidationContext(this, null, null) { MemberName = propertyName });
        }
```

#### Validationチェック時に対象のコントロールを変化させたい場合 (赤枠で囲む、文字の色を変える、など)
- AdornedElementPlaceholder はバリデーション対象のコントロールを表す。
- ex) 従って、以下のように記述するとバリデーション対象のコントロールが赤枠で囲まれるようになる。また、widthとheightは指定しなくても、自動で対象のコントロールサイズに合わせられる。

          <Border BorderBrush="Red" BorderThickness="2" Margin="0,0,6,0">
              <AdornedElementPlaceholder x:Name="_el"/>
          </Border>

# Behavior
- イベントとアクション (コードビハインドに書きたい処理) をセットにするためのもの

# TriggerAction
- アクションのみを記述したもの。イベントとの紐づけはXAML側で行う

# 依存関係プロパティ (DependencyProperty)　
- Bindingのtargetとなることができるプロパティ
- Bindingとはプロパティと依存関係プロパティを同期させるもの
- BindingにはSourceとTargetがあり、Sourceになれるのはプロパティ、Targetになれるのは依存関係プロパティ
- 参考 https://ikorin2.hatenablog.jp/entry/2018/11/09/075145, https://threeshark3.com/wpf-binding-usercontrol/

# ViewModel から別ウインドウを表示する方法
- InteractionRequest は廃止され、IDialogService が代替のクラス
- 公式ドキュメントを見ても、Prism7.x 以降はInteractionRequest の記載がない。
- 参考 InteractionRequestの廃止 https://github.com/PrismLibrary/Prism/issues/864 、Prism のリリースノート https://github.com/PrismLibrary/Prism/releases
- 代替のIDialogService に関して https://github.com/PrismLibrary/Prism/issues/1666, https://prismlibrary.com/docs/wpf/dialog-service.html
