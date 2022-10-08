from django.contrib import admin

# Register your models here.
from .models import oasis, oasisLike


class oasisLikeAdmin(admin.TabularInline):
    model = oasisLike

class oasisAdmin(admin.ModelAdmin):
    inlines = [oasisLikeAdmin]
    list_display = ['__str__', 'user']
    search_fields = ['content', 'user__username', 'user__email']
    class Meta:
        model = oasis

admin.site.register(oasis, oasisAdmin)


