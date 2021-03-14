using System;
using System.Collections.Generic;

#nullable disable

namespace aval_test_api.Model
{
    public partial class Product
    {
        public Product()
        {
            ProductsClients = new HashSet<ProductsClient>();
        }

        public int Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public string Value { get; set; }

        public virtual ICollection<ProductsClient> ProductsClients { get; set; }
    }
}
