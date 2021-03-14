using System;
using System.Collections.Generic;

#nullable disable

namespace aval_test_api.Model
{
    public partial class ProductsClient
    {
        public string Id { get; set; }
        public string ClientId { get; set; }
        public int? ProductId { get; set; }
        public int? Ammount { get; set; }

        public virtual Client Client { get; set; }
        public virtual Product Product { get; set; }
    }
}
