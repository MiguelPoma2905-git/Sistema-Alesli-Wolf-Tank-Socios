"""
Script para verificar la conexión a PostgreSQL
Ejecutar: python test_db_connection.py
"""

import os
from pathlib import Path
from dotenv import load_dotenv

# Cargar variables de entorno
load_dotenv()

def test_connection():
    print("=" * 60)
    print("🧪 TEST DE CONEXIÓN A PostgreSQL")
    print("=" * 60)
    
    # Obtener variables de entorno
    db_engine = os.getenv('DB_ENGINE')
    db_name = os.getenv('DB_NAME')
    db_user = os.getenv('DB_USER')
    db_password = os.getenv('DB_PASSWORD', '')
    db_host = os.getenv('DB_HOST')
    db_port = os.getenv('DB_PORT')
    
    print(f"\n📋 Configuración:")
    print(f"   Engine: {db_engine}")
    print(f"   Base de datos: {db_name}")
    print(f"   Usuario: {db_user}")
    print(f"   Host: {db_host}")
    print(f"   Puerto: {db_port}")
    print(f"   Contraseña: {'✓ Configurada' if db_password else '✗ NO CONFIGURADA'}")
    
    if not db_password:
        print("\n⚠️  ADVERTENCIA: La contraseña de PostgreSQL no está configurada en .env")
        print("   Por favor, edita el archivo .env y agrega tu contraseña")
        return False
    
    try:
        import psycopg
        print("\n✓ psycopg instalado correctamente")
        
        print("\n🔌 Intentando conectar a PostgreSQL...")
        
        conn = psycopg.connect(
            host=db_host,
            port=int(db_port),
            dbname=db_name,
            user=db_user,
            password=db_password
        )
        
        print("✅ ¡Conexión exitosa!")
        
        cursor = conn.cursor()
        cursor.execute("SELECT version();")
        version = cursor.fetchone()
        print(f"\n📊 Versión de PostgreSQL: {version[0]}")
        
        # Listar tablas si existen
        cursor.execute("""
            SELECT table_name FROM information_schema.tables 
            WHERE table_schema = 'public'
        """)
        tables = cursor.fetchall()
        
        if tables:
            print(f"\n📋 Tablas encontradas ({len(tables)}):")
            for table in tables:
                print(f"   - {table[0]}")
        else:
            print("\n⚠️  No hay tablas en la base de datos")
            print("   Ejecuta: psql -U postgres -d alesli_db -f backend/setup_database.sql")
        
        cursor.close()
        conn.close()
        
        print("\n" + "=" * 60)
        print("✅ TEST COMPLETADO EXITOSAMENTE")
        print("=" * 60)
        return True
        
    except Exception as e:
        print(f"\n❌ Error de conexión: {e}")
        print("\n💡 Sugerencias:")
        print("   1. Verifica que PostgreSQL está corriendo")
        print("   2. Revisa la contraseña en .env")
        print("   3. Verifica que la base de datos existe: alesli_db")
        print("   4. Verifica usuario y host en .env")
        return False

if __name__ == "__main__":
    success = test_connection()
    exit(0 if success else 1)
