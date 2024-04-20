from django.shortcuts import render
from django.http import HttpResponse
from django.views.decorators.csrf import csrf_exempt  # Handle PDF requests

# Import PDF rendering library
from renderers.pdf import PDFRenderer

@csrf_exempt
def render_pdf(request, pdf_url):
    # Validate PDF URL (optional)
    # ...

    # Fetch the PDF from the external source (replace example URL)
    response = requests.get(pdf_url)
    if response.status_code != 200:
        return HttpResponse("Error fetching PDF", status=500)

    # Render the PDF using django-renderers
    pdf_renderer = PDFRenderer()
    rendered_content = pdf_renderer.render(response.content)

    # Option 1: Render PDF as HTML
    # context = {'pdf_content': rendered_content}  # Prepare context for template
    # return render(request, 'pdf_template.html', context)

    # Option 2: Return secure image format (e.g., PNG)
    response = HttpResponse(content_type='image/png')
    response.write(rendered_content)
    return response
