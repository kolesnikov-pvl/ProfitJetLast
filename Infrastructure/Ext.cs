using System.ComponentModel;

namespace ProfitJetTest_new.Infrastructure;

public static class Ext
{
    public static string DescriptionAttr<T>(this T source)
    {
        if (source == null)
            return "";

        var field = source.GetType().GetField(source.ToString());

        var attributes = (DescriptionAttribute[])field.GetCustomAttributes(typeof(DescriptionAttribute), false);

        return attributes?.Length > 0 ? attributes[0].Description : source.ToString();
    }
}