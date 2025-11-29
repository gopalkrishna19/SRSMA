with open('index.html', 'r', encoding='utf-8') as f:
    content = f.read()

content = content.replace(
    'aos.css" rel="stylesheet">',
    'aos.css" rel="stylesheet">\n    <!-- Responsive Styles -->\n    <link rel="stylesheet" href="responsive.css">'
)

with open('index.html', 'w', encoding='utf-8') as f:
    f.write(content)

print("Added responsive.css link to index.html")
