using System;
using System.Collections.Generic;

#nullable disable

namespace aval_test_api.Model
{
    public partial class Client
    {
        public Client()
        {
            ProductsClients = new HashSet<ProductsClient>();
        }

        public string Id { get; set; }
        public string Cedula { get; set; }
        public string PrimerNombre { get; set; }
        public string SegundoNombre { get; set; }
        public string PrimerApellido { get; set; }
        public string SegundoApellido { get; set; }
        public string Telefono { get; set; }
        public string TipoUsuario { get; set; }

        public virtual ICollection<ProductsClient> ProductsClients { get; set; }
    }
}
