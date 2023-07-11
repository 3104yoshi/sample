using Prism.Mvvm;
using System.ComponentModel.DataAnnotations;
using System.Windows;

namespace Validation_Sample.ViewModels
{
    public class MainWindowViewModel : BindableBase
    {
        private string _annotationSampleText;

        public MainWindowViewModel()
        {

        }

        [MaxLength(10, ErrorMessage = "10文字までしか入力できません")]
        [RegularExpression(@"^[0-9]+$", ErrorMessage = "半角数字以外は入力できません")]
        public string AnnotationSampleText
        {
            get { return _annotationSampleText; }
            set
            {
                ValidateProperty(value, nameof(this.AnnotationSampleText));
                SetProperty(ref _annotationSampleText, value);
            }
        }

        public string ValidationRuleSampleText { get; set; }

        private void ValidateProperty<T>(T value, string propertyName)
        {
            Validator.ValidateProperty(value, new ValidationContext(this) { MemberName = propertyName });
        }
    }
}