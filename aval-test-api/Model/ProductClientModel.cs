using System;
using System;
using System.Collections.Generic;

#nullable disable

namespace aval_test_api.Model
{
    public partial class ProductClientModel: IDisposable
    {

        public string Id { get; set; }
        public string Cantidad { get; set; }
        public string Nombre { get; set; }
        public string Precio { get; set; }

        public void Dispose()
        {
            throw new NotImplementedException();
        }
    }
}
