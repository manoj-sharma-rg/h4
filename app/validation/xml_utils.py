import xml.etree.ElementTree as ET

def dict_to_xml(tag, d):
    # Stub: convert dict to XML string
    elem = ET.Element(tag)
    for key, val in d.items():
        child = ET.SubElement(elem, key)
        child.text = str(val)
    return ET.tostring(elem, encoding='unicode')

def xml_to_dict(xml_str):
    # Stub: convert XML string to dict
    root = ET.fromstring(xml_str)
    return {child.tag: child.text for child in root} 