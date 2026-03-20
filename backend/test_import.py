try:
    from backend.api.routes import dataset_routes
    print('backend import worked')
except ImportError as e:
    print('backend import failed:', e)
    from api.routes import dataset_routes
    print('api import worked')