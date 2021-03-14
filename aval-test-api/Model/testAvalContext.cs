using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;

#nullable disable

namespace aval_test_api.Model
{
    public partial class testAvalContext : DbContext
    {
        public testAvalContext()
        {
        }

        public testAvalContext(DbContextOptions<testAvalContext> options)
            : base(options)
        {
        }

        public virtual DbSet<Client> Clients { get; set; }
        public virtual DbSet<Product> Products { get; set; }
        public virtual DbSet<ProductsClient> ProductsClients { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
#warning To protect potentially sensitive information in your connection string, you should move it out of source code. You can avoid scaffolding the connection string by using the Name= syntax to read it from configuration - see https://go.microsoft.com/fwlink/?linkid=2131148. For more guidance on storing connection strings, see http://go.microsoft.com/fwlink/?LinkId=723263.
                optionsBuilder.UseSqlServer("DefaultConnection");
            }
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.HasAnnotation("Relational:Collation", "SQL_Latin1_General_CP1_CI_AS");

            modelBuilder.Entity<Client>(entity =>
            {
                entity.Property(e => e.Id)
                    .HasMaxLength(70)
                    .HasColumnName("id");

                entity.Property(e => e.Cedula)
                    .IsRequired()
                    .HasMaxLength(70)
                    .HasColumnName("cedula");

                entity.Property(e => e.PrimerApellido)
                    .IsRequired()
                    .HasMaxLength(70)
                    .HasColumnName("primerApellido");

                entity.Property(e => e.PrimerNombre)
                    .IsRequired()
                    .HasMaxLength(70)
                    .HasColumnName("primerNombre");

                entity.Property(e => e.SegundoApellido)
                    .HasMaxLength(70)
                    .HasColumnName("segundoApellido");

                entity.Property(e => e.SegundoNombre)
                    .HasMaxLength(70)
                    .HasColumnName("segundoNombre");

                entity.Property(e => e.Telefono)
                    .HasMaxLength(70)
                    .HasColumnName("telefono");


                entity.Property(e => e.TipoUsuario)
                    .IsRequired()
                    .HasMaxLength(70)
                    .HasColumnName("tipoUsuario");

            });

            modelBuilder.Entity<Product>(entity =>
            {
                entity.HasIndex(e => e.Id, "UI_idProduct")
                    .IsUnique();

                entity.Property(e => e.Id).HasColumnName("id");

                entity.Property(e => e.Description).HasColumnName("description");

                entity.Property(e => e.Name).HasColumnName("name");

                entity.Property(e => e.Value).HasColumnName("value");
            });

            modelBuilder.Entity<ProductsClient>(entity =>
            {
                entity.ToTable("ProductsClient");

                entity.Property(e => e.Id)
                    .HasMaxLength(1)
                    .HasColumnName("id");

                entity.Property(e => e.Ammount).HasColumnName("ammount");

                entity.Property(e => e.ClientId)
                    .HasMaxLength(1)
                    .HasColumnName("clientId");

                entity.Property(e => e.ProductId).HasColumnName("productId");

                entity.HasOne(d => d.Client)
                    .WithMany(p => p.ProductsClients)
                    .HasForeignKey(d => d.ClientId)
                    .HasConstraintName("FK__ProductsC__clien__6477ECF3");

                entity.HasOne(d => d.Product)
                    .WithMany(p => p.ProductsClients)
                    .HasForeignKey(d => d.ProductId)
                    .HasConstraintName("FK__ProductsC__produ__656C112C");
            });

            OnModelCreatingPartial(modelBuilder);
        }

        partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
    }
}
