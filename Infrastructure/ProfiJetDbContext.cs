using Microsoft.EntityFrameworkCore;

namespace ProfitJetTest_new;

public class ProfiJetDbContext:DbContext
{
    public ProfiJetDbContext(DbContextOptions<ProfiJetDbContext> options) : base(options) { }

    public DbSet<Employee> Employees { get; set; }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
    {
        if (!optionsBuilder.IsConfigured)
        {
            IConfigurationRoot configuration = new ConfigurationBuilder()
                .SetBasePath(Directory.GetCurrentDirectory())
                .AddJsonFile("appsettings.json")
                .Build();
            var connectionString = configuration.GetSection("ConnectionString").Value;
            optionsBuilder.UseSqlServer(connectionString);
        }
    }

    protected override void ConfigureConventions(ModelConfigurationBuilder configurationBuilder)
    {
        configurationBuilder.Properties<decimal>().HavePrecision(18, 6);
    }
}