using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using ProfitJetTest_new.Infrastructure;

namespace ProfitJetTest_new;

[Table(nameof(Employee), Schema = nameof(ProfitJetTest_new))]
public class Employee
{
    public enum OfRole
    {
        [Description("Architect")]
        Architect,
        [Description("Schematic Designer")]
        SchematicDesigner,
        [Description("Tech Writer")]
        TechWriter,
        [Description("Electrical Engineer")]
        ElectricalEngineer
    }

    [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
    [Key]
    public int Id { get; set; }
   
    public string ProjectName { get; set; }

    public string FirstName { get; set; }
  
    public string LastName { get; set; }

    public string RoleStr => Role.DescriptionAttr();

    public OfRole? Role { get; set; }

    public decimal Rate { get; set; }
}