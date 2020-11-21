using Microsoft.AspNetCore.Mvc;

namespace Calculator.Web.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CalculatorController : ControllerBase
    {
        public class Operation
        {
            public double FirstOperand { get; set; }
            public double SecondOperand { get; set; }
            public string Operator { get; set; }
        }
        [HttpPost]
        [Route("calculate")]
        public ActionResult<double> Calculate(Operation model)
        {
            switch (model.Operator)
            {
                case "+":
                    return model.FirstOperand + model.SecondOperand;
                case "-":
                    return model.FirstOperand - model.SecondOperand;
                case "/":
                    return model.FirstOperand / model.SecondOperand;
                case "*":
                    return model.FirstOperand * model.SecondOperand;
            }
            return 0;
        }
    }
}
