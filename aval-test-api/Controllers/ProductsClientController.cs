using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using aval_test_api.Model;

namespace aval_test_api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProductsClientController : ControllerBase
    {
        private readonly testAvalContext _context;

        public ProductsClientController(testAvalContext context)
        {
            _context = context;
        }

        // GET: api/ProductsClient
        [HttpGet]
        public async Task<ActionResult<IEnumerable<ProductsClient>>> GetProductsClients()
        {
            return await _context.ProductsClients.ToListAsync();
        }

        // GET: api/ProductsClient/5
        [HttpGet("{id}")]
        public async Task<ActionResult<ProductsClient>> GetProductsClient(string id)
        {
            var productsClient = await _context.ProductsClients.FindAsync(id);

            if (productsClient == null)
            {
                return NotFound();
            }

            return productsClient;
        }

        // PUT: api/ProductsClient/5
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPut("{id}")]
        public async Task<IActionResult> PutProductsClient(string id, ProductsClient productsClient)
        {
            if (id != productsClient.Id)
            {
                return BadRequest();
            }

            _context.Entry(productsClient).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ProductsClientExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/ProductsClient
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPost]
        public async Task<ActionResult<ProductsClient>> PostProductsClient(ProductsClient productsClient)
        {
            _context.ProductsClients.Add(productsClient);
            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateException)
            {
                if (ProductsClientExists(productsClient.Id))
                {
                    return Conflict();
                }
                else
                {
                    throw;
                }
            }

            return CreatedAtAction("GetProductsClient", new { id = productsClient.Id }, productsClient);
        }

        // DELETE: api/ProductsClient/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<ProductsClient>> DeleteProductsClient(string id)
        {
            var productsClient = await _context.ProductsClients.FindAsync(id);
            if (productsClient == null)
            {
                return NotFound();
            }

            _context.ProductsClients.Remove(productsClient);
            await _context.SaveChangesAsync();

            return productsClient;
        }


        // GET: api/ProductsClient/
        [HttpGet("{clientId}")]
        [Route("{clientId}/productsClient")]
        public List<ProductClientModel> GetProductsClientByClientId(string clientId)
        {

            var qa = (from pc in _context.ProductsClients
                      join p in _context.Products
                      on pc.ProductId equals p.Id
                      where pc.ClientId == clientId
                      select new
                      {
                          Id = pc.Id,
                          Cantidad = pc.Ammount,
                          Nombre = p.Name,
                          Precio = p.Value
                      }); ;

            List<ProductClientModel> res = new List<ProductClientModel>();

            foreach(var el in qa)
            {
                ProductClientModel productClient = new ProductClientModel();
                productClient.Cantidad = el.Cantidad.ToString();
                productClient.Id = el.Id;
                productClient.Nombre = el.Nombre;
                productClient.Precio = el.Precio;
                res.Add(productClient);
            }

            return res;

        }

        private bool ProductsClientExists(string id)
        {
            return _context.ProductsClients.Any(e => e.Id == id);
        }
    }
}
