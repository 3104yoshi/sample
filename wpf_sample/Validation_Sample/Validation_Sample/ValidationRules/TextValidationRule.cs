using System;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows.Controls;

namespace Validation_Sample.ValidationRules
{
    internal class TextValidationRule : ValidationRule
    {
        public override ValidationResult Validate(object value, CultureInfo cultureInfo)
        {
            if (((string)value).Contains("a"))
            {
                return new ValidationResult(false, "'a'を含む文字列は入力できません");
            }

            return ValidationResult.ValidResult;
        }
    }
}
