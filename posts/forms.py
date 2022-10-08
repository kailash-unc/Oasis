from django.conf import settings
from django import forms

from .models import oasis

MAX_oasis_LENGTH = settings.MAX_oasis_LENGTH

class oasisForm(forms.ModelForm):
    class Meta:
        model = oasis
        fields = ['content']
    
    def clean_content(self):
        content = self.cleaned_data.get("content")
        if len(content) > MAX_oasis_LENGTH:
            raise forms.ValidationError("This oasis is too long")
        return content