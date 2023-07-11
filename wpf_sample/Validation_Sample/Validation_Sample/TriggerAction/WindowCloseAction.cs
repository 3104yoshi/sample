using Microsoft.Xaml.Behaviors;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows;
using System.Windows.Controls;

namespace Validation_Sample.TriggerAction
{
    internal class WindowCloseAction : TriggerAction<Button>
    {
        protected override void Invoke(object parameter)
        {
            var window = Window.GetWindow((Button)AssociatedObject);
            window.Close();
        }
    }
}
