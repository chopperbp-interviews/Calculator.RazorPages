using Calculator.Web.Converters;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;

namespace Web
{
    public class Startup
    {
        private readonly IWebHostEnvironment env;
        private readonly IConfiguration configuration;

        public Startup(IWebHostEnvironment env, IConfiguration configuration)
        {
            this.env = env;
            this.configuration = configuration;
        }

        private void ConfigureInMemoryDatabases(IServiceCollection services)
        {
        }

        // https://docs.microsoft.com/en-us/aspnet/core/fundamentals/environments?view=aspnetcore-3.1
        public void ConfigureDevelopmentServices(IServiceCollection services)
        {
            ConfigureInMemoryDatabases(services);
            ConfigureServices(services);
        }
        public void ConfigureProductionServices(IServiceCollection services)
        {
            ConfigureInMemoryDatabases(services);
            ConfigureServices(services);

        }
        public void ConfigureTestingServices(IServiceCollection services)
        {
            ConfigureInMemoryDatabases(services);
            ConfigureServices(services);
        }
        public void ConfigureServices(IServiceCollection services)
        {
            var builder = services.AddRazorPages();
            services.AddMvc().AddJsonOptions(options =>
                 options.JsonSerializerOptions.Converters.Add(new DoubleConverter())
            );
#if DEBUG
            if (env.IsDevelopment())
            {
                builder.AddRazorRuntimeCompilation();
            }
#endif
        }

        public void Configure(IApplicationBuilder app,
                              IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
                app.UseDatabaseErrorPage();
            }
            else
            {
                app.UseExceptionHandler("/Errors/500");
                app.UseHsts();
            }
            app.UseStatusCodePagesWithReExecute("/Errors/{0}");
            app.UseHttpsRedirection();
            app.UseStaticFiles();
            app.UseRouting();

            app.UseCookiePolicy();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapRazorPages();
                endpoints.MapControllers();
            });
        }
    }
}
