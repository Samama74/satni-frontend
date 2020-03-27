#!/usr/bin/env python3

from lemmas.models import Lemma
from terms.models import Concept, MultiLingualConcept, Term
from termwikiimporter import bot

langs = {
    'en': 'eng',
    'fi': 'fin',
    'nb': 'nob',
    'nn': 'nno',
    'sv': 'swe',
    'lat': 'lat',
    'sma': 'sma',
    'se': 'sme',
    'smj': 'smj',
    'smn': 'smn',
    'sms': 'sms',
}


def make_concept(lang, concept_infos, m):
    for concept_info in concept_infos:
        if lang == concept_info['language']:
            return Concept.objects.create(
                language=langs[lang],
                definition=concept_info.get('definition'),
                explanation=concept_info.get('explanation'),
                multilingualconcepts=m)
    else:
        return Concept.objects.create(
            language=langs[lang], multilingualconcepts=m)


def same_lang_expressions(lang, expressions):
    return [
        expression for expression in expressions
        if expression['language'] == lang
    ]

def make_m():
    dumphandler = bot.DumpHandler()


    for x, (title, concept) in enumerate(dumphandler.concepts):
        print(f'Adding {x} {title}')
        if x > 100:
            break
        x += 1
        m, _ = MultiLingualConcept.objects.get_or_create(name=f'{title}')
        yield m, concept

def make_c(m, concept):
    for lang in concept.languages():
        c = make_concept(lang, concept.data['concept_infos'], m)
        for expression in same_lang_expressions(
                lang, concept.related_expressions):
            l, _ = Lemma.objects.get_or_create(
                lemma=expression['expression'],
                pos=expression['pos'],
                language=langs[lang])
            term = Term.objects.create(
                status=expression.get('status'),
                sanctioned=expression.get('sanctioned', False),
                note=expression.get('note'),
                source=expression.get('source'),
                concept=c,
                expression=l)
            l.multilingualconcepts.add(m)

def run():
    for m, concept in make_m():
        make_c(m, concept)
