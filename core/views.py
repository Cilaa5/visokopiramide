from django.shortcuts import render


def home(request):
    return render(request, 'core/home.html')


def pyramids(request):
    return render(request, 'core/pyramids.html')


def visit(request):
    return render(request, 'core/visit.html')


def getting_here(request):
    return render(request, 'core/getting_here.html')
