using Microsoft.Xaml.Behaviors;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows;

namespace Validation_Sample.Behavior
{
    internal class ConfirmBehaivior : Behavior<Window>
    {
        protected override void OnAttached()
        {
            base.OnAttached();
            this.AssociatedObject.Closing += AssociatedObject_Closing;
        }

        protected override void OnDetaching()
        {
            base.OnDetaching();
            this.AssociatedObject.Closing -= AssociatedObject_Closing;
        }

        private void AssociatedObject_Closing(object sender, System.ComponentModel.CancelEventArgs e)
        {
            if (MessageBox.Show("閉じますか？", "修了確認", MessageBoxButton.YesNo) == MessageBoxResult.No)
            {
                e.Cancel = true;
            }

            return;
        }
    }
}
