import graphene
from graphene_mongo.fields import MongoengineConnectionField
from mongoengine.queryset.visitor import Q

from .models import Stem
from .types import StemType


class Query(graphene.ObjectType):
    stem_list = MongoengineConnectionField(
        StemType,
        search=graphene.String(),
        wanted=graphene.List(graphene.String),
        wanted_dicts=graphene.List(graphene.String))
    has_stem = graphene.List(StemType, exact=graphene.String())

    def resolve_has_stem(self, info, exact, **kwargs):
        return Stem.objects(stem=exact)

    def resolve_stem_list(self, info, **kwargs):
        print('stem kwargs:', kwargs)
        wanted = kwargs['wanted']
        wanted_dicts = kwargs['wanted_dicts']
        filter = Q(stem__istartswith=kwargs['search'])

        by_stem = Stem.objects(filter).order_by('stem')
        by_src_langs = [
            s for s in by_stem
            if any([srclang in wanted for srclang in s.srclangs])
        ]
        by_target_langs = [
            s for s in by_src_langs
            if any([targetlang in wanted for targetlang in s.targetlangs])
        ]
        by_wanted_dicts = [
            s for s in by_target_langs
            if any([dict in wanted_dicts for dict in s.dicts])
        ]

        return by_wanted_dicts
